import assert from 'node:assert/strict'
import { createRequire } from 'node:module'
import { mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ui = fileURLToPath(new URL('..', import.meta.url))
const workspace = fileURLToPath(new URL('../../..', import.meta.url))
const require = createRequire(join(workspace, 'package.json'))
const esbuild = createRequire(require.resolve('vite'))('esbuild')
const { chromium, expect } = require('@playwright/test')
const fixture = mkdtempSync(join(tmpdir(), 'swiftuijs-performance-'))
let browser
try {
  const result = await esbuild.build({ entryPoints: [join(ui, 'scripts/fixtures/performance-consumer.tsx')],
    bundle: true, platform: 'browser', format: 'iife', minify: true, write: false,
    outdir: fixture, define: { 'process.env.NODE_ENV': '"production"' },
  })
  browser = await chromium.launch({ headless: true, executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE })
  const page = await browser.newPage({ viewport: { width: 1200, height: 800 } })
  const errors = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  await page.setContent('<!doctype html><title>SwiftUI.js performance regression</title><button id="anchor" style="position:fixed;top:16px;left:16px">Anchor</button><div id="root" style="margin-top:80px"></div>')
  for (const css of result.outputFiles.filter(file => file.path.endsWith('.css'))) await page.addStyleTag({ content: css.text })
  await page.addScriptTag({ content: result.outputFiles.find(file => file.path.endsWith('.js')).text })
  const settle = () => page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))))
  const mount = async mode => { await page.evaluate(mode => window.performanceFixture.mount(mode), mode); await settle() }
  const counts = () => page.evaluate(() => ({ ...window.performanceFixture.counts }))
  await mount('axis')
  await expect(page.locator('[data-axis]')).toHaveCount(100)
  await expect(page.locator('[data-axis]').first()).toHaveText('regular')
  const beforeSize = (await counts()).sizeRenders
  for (const width of [1210, 1220, 1230, 1240, 1250]) { await page.setViewportSize({ width, height: 800 }); await settle() }
  const axisRenders = (await counts()).sizeRenders - beforeSize
  assert.equal(axisRenders, 0, 'Same-breakpoint resizing must not re-render axis consumers')
  await page.setViewportSize({ width: 390, height: 800 }); await settle()
  await expect(page.locator('[data-axis]').first()).toHaveText('compact')
  await mount('full-size')
  await page.setViewportSize({ width: 400, height: 800 }); await settle()
  await expect(page.locator('[data-axis]').first()).toHaveText('400')
  await mount('motion')
  await expect.poll(async () => (await counts()).mediaActive).toBe(1)
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect(page.locator('output').first()).toHaveText('true')
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.locator('output').first()).toHaveText('false')
  await mount('layout')
  assert.equal((await counts()).mediaActive, 0, 'Last subscriber must release the media listener')
  const beforeLayout = (await counts()).layoutRenders
  await page.locator('#tick').click(); await settle()
  const layoutRenders = (await counts()).layoutRenders - beforeLayout
  assert.equal(layoutRenders, 0, 'Unrelated stack props must not notify memoized layout consumers')
  await mount('popover')
  await expect(page.getByRole('dialog', { name: 'Performance popover' })).toBeVisible()
  await page.waitForTimeout(400)
  await settle()
  await page.evaluate(() => {
    const counts = window.performanceFixture.counts
    counts.anchorReads = 0; counts.floatingReads = 0
    for (let i = 0; i < 100; i++) window.dispatchEvent(new Event('scroll'))
  })
  const synchronous = await counts()
  assert.equal(synchronous.anchorReads + synchronous.floatingReads, 0, 'Scroll bursts must defer geometry work to a frame')
  await settle()
  const floating = await counts()
  assert.equal(floating.anchorReads, 1, 'A scroll burst must measure its anchor once')
  assert.equal(floating.floatingReads, 1, 'An unchanged anchor must fit its surface once')
  // A scheduled callback must never touch an unmounted surface.
  await page.evaluate(() => {
    window.dispatchEvent(new Event('scroll'))
    window.performanceFixture.mount('none')
  })
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await settle()
  assert.equal((await counts()).anchorReads, floating.anchorReads)
  assert.deepEqual(errors, [], 'Performance fixture must have no runtime or console errors')
  console.table({ axis: { consumers: 100, extraRenders: axisRenders },
    layout: { consumers: 100, extraRenders: layoutRenders },
    reducedMotion: { consumers: 100, nativeListeners: 1 },
    scrollBurst: { events: 100, anchorReads: floating.anchorReads, surfaceReads: floating.floatingReads } })
  console.log('Production runtime performance and cleanup budgets passed.')
} finally {
  await browser?.close()
  rmSync(fixture, { recursive: true, force: true })
}

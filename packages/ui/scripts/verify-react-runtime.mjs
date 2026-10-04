import assert from 'node:assert/strict'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { mkdirSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

export async function verifyReactRuntime({ fixture, esbuild, workspace }) {
  const require = createRequire(join(workspace, 'package.json'))
  const { chromium, expect } = require('@playwright/test')
  const build = {
    bundle: true, loader: { '.css': 'empty' }, jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
  }
  const serverFile = join(fixture, 'runtime-ssr.cjs')
  await esbuild.build({ ...build, platform: 'node', format: 'cjs', outfile: serverFile,
    stdin: { resolveDir: fixture, contents: `import React from 'react'; import { renderToString } from 'react-dom/server'; import { App } from './app'; console.log(renderToString(React.createElement(React.StrictMode, null, React.createElement(App))));` },
  })
  const html = execFileSync(process.execPath, [serverFile], { encoding: 'utf8' }).trim()
  const repeat = execFileSync(process.execPath, [serverFile], { encoding: 'utf8' }).trim()
  assert.equal(html, repeat, 'The complete consumer must produce deterministic SSR markup')
  const browserFile = join(fixture, 'runtime-browser.js')
  await esbuild.build({ ...build, define: { 'process.env.NODE_ENV': '"development"' }, platform: 'browser', format: 'iife', outfile: browserFile,
    stdin: { resolveDir: fixture, contents: `import React from 'react'; import { hydrateRoot } from 'react-dom/client'; import { App } from './app'; window.hydrationErrors = []; window.root = hydrateRoot(document.getElementById('root'), React.createElement(React.StrictMode, null, React.createElement(App)), { onRecoverableError: error => window.hydrationErrors.push(error.message) });` },
  })
  const version = JSON.parse(readFileSync(join(fixture, 'node_modules/react/package.json'), 'utf8')).version
  const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE })
  try {
    for (const width of [390, 1280]) {
      const page = await browser.newPage({ viewport: { width, height: 900 } })
      const errors = []
      page.on('pageerror', error => errors.push(error.message))
      page.on('console', message => {
        if (['error', 'warning'].includes(message.type())) errors.push(message.text())
      })
      await page.setContent(`<!doctype html><html><head><title>React ${version} compatibility</title></head><body><div id="root">${html}</div></body></html>`)
      // Load the package's real CSS as well as its browser bundle.
      const css = await esbuild.build({ stdin: { contents: `import '@swiftuijs/ui/style/index.css'; import './app';`, resolveDir: fixture },
        bundle: true, write: false, outdir: join(fixture, 'styles'), jsx: 'automatic',
      })
      for (const output of css.outputFiles.filter(file => file.path.endsWith('.css'))) await page.addStyleTag({ content: output.text })
      await page.addScriptTag({ path: browserFile })
      await expect(page).toHaveTitle(`React ${version} compatibility`)
      await expect(page.getByRole('heading', { name: 'React compatibility' })).toBeVisible()
      await expect(page.getByLabel('Forwarded refs')).toHaveText('Ready')
      assert.deepEqual(await page.evaluate(() => window.hydrationErrors), [], 'Hydration must not recover from mismatched markup')
      assert.ok(await page.locator('[data-lazy-item]').count() < 30, 'Lazy hydration must stay bounded')

      if (process.env.COMPAT_EVIDENCE_DIR) {
        mkdirSync(process.env.COMPAT_EVIDENCE_DIR, { recursive: true })
        await page.screenshot({ path: join(process.env.COMPAT_EVIDENCE_DIR, `react-${version}-${width}.png`), fullPage: true })
      }
      await page.getByRole('region', { name: 'Long list' }).evaluate(element => { element.scrollTop = 20000 })
      await expect(page.locator('[data-lazy-item="500"]')).toBeVisible()
      await expect(page.locator('[data-lazy-item="0"]')).toHaveCount(0)
      assert.ok(await page.locator('[data-lazy-item]').count() < 30)

      await page.getByRole('switch', { name: 'Notifications' }).check()
      await expect(page.getByLabel('Notification state')).toHaveText('On')
      await page.getByRole('textbox', { name: 'Name' }).fill('Grace')
      await expect(page.getByLabel('Name value')).toHaveText('Grace')
      await page.getByRole('slider', { name: 'Progress' }).focus()
      await page.keyboard.press('ArrowRight')
      await expect(page.getByLabel('Progress value')).toHaveText('21')

      await page.getByRole('button', { name: 'Actions', exact: true }).focus()
      await page.keyboard.press('ArrowDown')
      await expect(page.getByRole('menuitem', { name: 'Edit' })).toBeFocused()
      await page.keyboard.press('ArrowDown')
      await expect(page.getByRole('menuitem', { name: 'Share' })).toBeFocused()
      await page.keyboard.press('Enter')
      await expect(page.getByLabel('Menu selection')).toHaveText('Share')
      await expect(page.getByRole('menu')).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'Actions', exact: true })).toBeFocused()

      await page.getByRole('button', { name: 'Open sheet' }).click()
      const dialog = page.getByRole('dialog', { name: 'Editor' })
      await expect(dialog).toBeVisible()
      await expect(dialog).toHaveAttribute('data-selected-detent', 'medium')
      await page.getByRole('button', { name: 'Adjust sheet height' }).click()
      await expect(dialog).toHaveAttribute('data-selected-detent', 'large')
      await page.keyboard.press('Escape')
      await expect(dialog).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'Open sheet' })).toBeFocused()

      await page.getByRole('button', { name: 'Open popover' }).click()
      await expect(page.getByRole('dialog', { name: 'Help' })).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog', { name: 'Help' })).toHaveCount(0)
      await page.getByRole('button', { name: 'Go to detail' }).click()
      await expect(page.getByRole('heading', { name: 'Detail page' })).toBeVisible()
      await page.getByRole('button', { name: 'Go back' }).click()
      await expect(page.getByRole('heading', { name: 'Detail page' })).toHaveCount(0)
      await expect(page.getByRole('button', { name: 'Go to detail' })).toBeVisible()

      assert.deepEqual(await page.evaluate(() => window.hydrationErrors), [])
      assert.deepEqual(errors, [], 'The consumer must have no runtime or console errors')
      await page.evaluate(() => window.root.unmount())
      await expect(page.locator('#root')).toBeEmpty()
      assert.deepEqual(errors, [], 'Unmount must not emit runtime or console errors')
      console.log(`React ${version}, ${width}px: StrictMode hydration, refs, controlled forms, keyboard menu, sheet, popover, navigation and unmount passed.`)
      await page.close()
    }
  } finally {
    await browser.close()
  }
}

import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
const controlledClocks = new WeakSet<Page>()

async function freezeMotion(page: Page, selector: string) {
  let sample: { name: string; opacity: number; translate: string; duration: string } | undefined
  await expect.poll(async () => {
    sample = await page.locator(selector).evaluate(node => {
    const animations = node.getAnimations()
    if (!animations.length) return undefined
    for (const animation of animations) {
      animation.pause()
      animation.currentTime = Number(animation.effect!.getTiming().duration) / 2
    }
    const style = getComputedStyle(node)
    return { name: style.animationName, opacity: Number(style.opacity), translate: style.translate, duration: style.animationDuration }
    })
    return Boolean(sample)
  }).toBe(true)
  return sample!
}
async function armMotion(page: Page, selector: string, controlClock = true) {
  // Sample actual intermediate CSS frames deterministically on busy CI runners.
  // Freeze fallback timers as well; resume them before checking restored focus.
  if (controlClock) {
    await page.clock.install()
    await page.clock.pauseAt(new Date())
    controlledClocks.add(page)
  }
  await page.evaluate(selector => {
    document.addEventListener('animationstart', event => {
      if (event.target instanceof HTMLElement && event.target.matches(selector)) {
        event.target.getAnimations().forEach(animation => animation.pause())
      }
    })
  }, selector)
}
async function finishMotion(page: Page, selector: string) {
  await page.locator(selector).evaluate(node => node.getAnimations().forEach(animation => animation.finish()))
  if (controlledClocks.has(page)) await page.clock.runFor(1)
}

type Story = { id: string; title: string; name: string; type: string }
const index = JSON.parse(readFileSync(fileURLToPath(new URL('../apps/storybook/storybook-static/index.json', import.meta.url)), 'utf8')) as { entries: Record<string, Story> }
const groups = new Map<string, Story[]>()
for (const story of Object.values(index.entries)) {
  if (story.type === 'story') groups.set(story.title, [...groups.get(story.title) ?? [], story])
}
async function open(page: Page, id: string, dark: boolean) {
  await page.goto(`/iframe.html?id=${id}&viewMode=story`, { waitUntil: 'domcontentloaded' })
  await page.waitForFunction(() => Boolean(document.querySelector('#storybook-root')?.children.length))
  await page.evaluate(theme => document.documentElement.setAttribute('data-theme', theme), dark ? 'dark' : 'light')
}
for (const [title, stories] of groups) {
  const story = stories.find(story => story.name === 'Default') ?? stories[0]
  test(`${title}: surface, typography and viewport`, async ({ page }, info) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    await open(page, story.id, info.project.name.endsWith('dark'))
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
    if (title === 'SwiftUI/AsyncImage') await expect(page.locator('.sw-asyncimage')).toHaveAttribute('data-phase', 'success')
    if (title === 'SwiftUI/NavigationLink') await expect(page.getByRole('button', { name: 'Go to Detail' })).toBeVisible()
    if (title === 'SwiftUI/StandardPage') await expect(page.getByText('Page Content')).toBeVisible()
    const fonts = await page.locator('#storybook-root [class*="sw-"]').evaluateAll(nodes => nodes.map(node => getComputedStyle(node).fontFamily))
    expect(fonts.every(font => !font.includes('Times New Roman'))).toBe(true)
    expect(errors).toEqual([])
    if (process.env.UI_AUDIT_CAPTURE) await page.screenshot({ animations: 'disabled', path: `${process.env.UI_AUDIT_CAPTURE}/${story.id}-${info.project.name}.png` })
  })
}
test('Sheet grabber: top spacing, separate touch area and neutral keyboard focus', async ({ page }, info) => {
  await open(page, 'swiftui-sheet--detents', info.project.name.endsWith('dark'))
  await page.getByRole('button', { name: 'Show Detent Sheet' }).click()
  const grabber = page.getByRole('button', { name: 'Adjust sheet height' })
  await expect(grabber).toBeVisible()
  const geometry = await grabber.evaluate(node => {
    const s = getComputedStyle(node), pill = getComputedStyle(node, '::before')
    return { height: Math.round(node.getBoundingClientRect().height), border: s.borderWidth, background: s.backgroundColor,
      top: pill.top, width: pill.width, pillHeight: pill.height, radius: pill.borderRadius }
  })
  expect(geometry).toMatchObject({ height: 44, border: '0px', background: 'rgba(0, 0, 0, 0)', top: '6px', width: '36px', pillHeight: '5px' })
  await grabber.click()
  await expect(page.getByRole('dialog')).toHaveAttribute('data-selected-detent', 'large')
  await page.keyboard.press('Tab')
  await page.keyboard.press('Shift+Tab')
  await expect(grabber).toBeFocused()
  const ring = await grabber.evaluate(node => getComputedStyle(node, '::before').outlineColor)
  expect(ring).toMatch(/rgb\((99, 99, 102|174, 174, 178)\)/)
  await grabber.press('Enter')
  await expect(page.getByRole('dialog')).toHaveAttribute('data-selected-detent', 'medium')
})
test('Legacy ActionSheet: visible grabber, keyboard cycling and pointer drag', async ({ page }, info) => {
  await open(page, 'swiftui-navigationstack--resizable-action-sheet', info.project.name.endsWith('dark'))
  await page.getByText('Open ActionSheet', { exact: true }).click()
  const grabber = page.getByRole('button', { name: 'Adjust sheet height' })
  await expect(grabber).toBeVisible()
  const panel = page.locator('.sw-page[data-page-type="actionsheet"]')
  await expect.poll(async () => Math.round((await panel.boundingBox())!.height)).toBe(422)
  const visible = await grabber.evaluate(node => ({ width: getComputedStyle(node, '::before').width, height: Math.round(node.getBoundingClientRect().height) }))
  expect(visible).toEqual({ width: '36px', height: 44 })
  await grabber.press('Enter')
  await expect.poll(async () => Math.round((await panel.boundingBox())!.height)).toBe(759)
  const box = (await grabber.boundingBox())!
  await page.mouse.move(box.x + box.width / 2, box.y + 10)
  await page.mouse.down()
  await page.mouse.move(box.x + box.width / 2, box.y + 350, { steps: 8 })
  await page.mouse.up()
  await expect.poll(async () => Math.round((await panel.boundingBox())!.height)).toBe(422)
})
test('Dark toggle keeps a white thumb on the on side while pressed', async ({ page }, info) => {
  await open(page, 'swiftui-toggle--default', info.project.name.endsWith('dark'))
  const toggle = page.locator('.sw-toggle-on').first(), thumb = toggle.locator('.sw-toggle-thumb')
  await expect(thumb).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  const before = (await thumb.boundingBox())!.x
  const box = (await toggle.boundingBox())!
  await page.mouse.move(box.x + 30, box.y + 15)
  await page.mouse.down()
  expect((await thumb.boundingBox())!.x).toBeGreaterThanOrEqual(before - 1)
  await page.mouse.up()
})
test('Top tabs precede content and vertical split panes do not overlap', async ({ page }, info) => {
  const dark = info.project.name.endsWith('dark')
  await open(page, 'swiftui-tabview--top-tab-bar', dark)
  const bar = (await page.locator('.sw-tab-bar').boundingBox())!, content = (await page.locator('.sw-tab-content').boundingBox())!
  expect(bar.y + bar.height).toBeLessThanOrEqual(content.y)
  await open(page, 'swiftui-vsplitview--default', dark)
  const panes = await page.locator('.sw-splitview-pane').all()
  const a = (await panes[0].boundingBox())!, b = (await panes[1].boundingBox())!
  expect(a.height).toBeGreaterThan(40)
  expect(b.y).toBeGreaterThanOrEqual(a.y + a.height)
})
for (const [id, trigger, selector] of [
  ['swiftui-alert--default', 'Show Alert', '.sw-alert-content'],
  ['swiftui-confirmationdialog--default', 'Show Confirmation Dialog', '.sw-confirmation-dialog-content'],
  ['swiftui-menu--default', 'Options', '.sw-menu[role="menu"]'],
  ['swiftui-popover--default', 'Show Popover', '.sw-popover-content'],
] as const) {
  test(`${id}: opened surface stays within the viewport`, async ({ page }, info) => {
    await open(page, id, info.project.name.endsWith('dark'))
    await page.getByRole('button', { name: trigger, exact: true }).click()
    const surface = page.locator(selector).first()
    await expect(surface).toBeVisible()
    const box = (await surface.boundingBox())!
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.x + box.width).toBeLessThanOrEqual(page.viewportSize()!.width)
    const accessibility = await new AxeBuilder({ page }).include(selector).withTags(['wcag2a', 'wcag2aa']).analyze()
    expect(accessibility.violations).toEqual([])
    if (selector === '.sw-alert-content') await expect(surface).toHaveCSS('background-color', info.project.name.endsWith('dark') ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)')
    if (selector === '.sw-popover-content') {
      await expect(surface).toHaveCSS('backdrop-filter', 'none')
      await expect(surface).toHaveCSS('background-color', info.project.name.endsWith('dark') ? 'rgb(28, 28, 30)' : 'rgb(255, 255, 255)')
    }
  })
}

test('Floating controls fit the right edge and an above-anchor popover stays above', async ({ page }, info) => {
  const dark = info.project.name.endsWith('dark')
  await open(page, 'swiftui-menu--at-viewport-edge', dark)
  await page.getByRole('button', { name: 'Edge menu' }).click()
  const menu = page.locator('[role="menu"]').first()
  await expect.poll(async () => { const box = (await menu.boundingBox())!; return box.x + box.width }).toBeLessThanOrEqual(page.viewportSize()!.width - 7)
  await open(page, 'swiftui-popover--at-viewport-edge', dark)
  const trigger = page.getByRole('button', { name: 'Edge popover' })
  await trigger.click()
  const popover = page.getByRole('dialog')
  await expect(popover).toBeVisible()
  await expect.poll(async () => { const box = (await popover.boundingBox())!; return box.x + box.width }).toBeLessThanOrEqual(page.viewportSize()!.width - 7)
  const box = (await popover.boundingBox())!, anchor = (await trigger.boundingBox())!
  expect(box.y + box.height).toBeLessThanOrEqual(anchor.y)
})

test('Scoped themes, inherited glass and portal tokens update together', async ({ page }, info) => {
  await open(page, 'swiftui-uiprovider--default', info.project.name.endsWith('dark'))
  const surface = page.locator('.sw-glass[data-glass="on"]').first()
  await expect(surface).toBeVisible()
  await expect(surface).toHaveCSS('backdrop-filter', 'blur(20px) saturate(1.46)')
  await page.getByRole('switch', { name: 'Dark theme' }).check()
  await expect(page.locator('.sw-ui-provider').first()).toHaveAttribute('data-theme', 'dark')
  if (process.env.UI_AUDIT_CAPTURE) await page.screenshot({ path: `${process.env.UI_AUDIT_CAPTURE}/theme-dark-${info.project.name}.png`, animations: 'disabled' })
  await page.getByRole('button', { name: 'Open themed sheet' }).click()
  const dialog = page.getByRole('dialog', { name: 'Themed sheet' })
  await expect(dialog).toHaveAttribute('data-theme', 'dark')
  await expect(dialog).toHaveCSS('--sw-accent-color', '#C4B5FD')
  await expect(dialog.getByRole('heading', { name: 'Sheet preferences' })).toHaveCSS('color', 'rgb(255, 255, 255)')
  await expect(dialog.locator('.sw-sheet-content')).toHaveCSS('background-color', 'rgb(28, 28, 30)')
  await dialog.getByRole('button', { name: 'Sheet actions' }).click()
  const nestedItem = dialog.getByRole('menuitem', { name: 'Edit preferences' })
  await expect(nestedItem).toBeFocused()
  await nestedItem.click()
  await expect(dialog).toBeVisible()
  if (process.env.UI_AUDIT_CAPTURE) await page.screenshot({ path: `${process.env.UI_AUDIT_CAPTURE}/theme-portal-${info.project.name}.png`, animations: 'disabled' })
  await page.getByRole('button', { name: 'Close', exact: true }).click()
  await page.getByRole('switch', { name: 'Liquid Glass' }).uncheck()
  await expect(page.locator('.sw-glass').first()).toHaveAttribute('data-glass', 'off')
  await expect(page.locator('.sw-glass').first()).toHaveCSS('backdrop-filter', 'none')
})
test('System theme reacts to browser preference and material accessibility fallbacks are opaque', async ({ page }, info) => {
  await open(page, 'swiftui-glass--default', info.project.name.endsWith('dark'))
  const text = page.getByText('Regular material'), glass = page.locator('.sw-glass').first()
  await page.emulateMedia({ colorScheme: 'dark' })
  await expect(text).toHaveCSS('color', 'rgb(255, 255, 255)')
  await page.emulateMedia({ colorScheme: 'light' })
  await expect(text).toHaveCSS('color', 'rgb(0, 0, 0)')
  await page.emulateMedia({ contrast: 'more' })
  await expect(glass).toHaveCSS('backdrop-filter', 'none')
  await expect(glass).toHaveCSS('background-color', 'rgb(255, 255, 255)')
  await page.emulateMedia({ contrast: 'no-preference' })
  const cdp = await page.context().newCDPSession(page)
  await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-transparency', value: 'reduce' }] })
  expect(await page.evaluate(() => matchMedia('(prefers-reduced-transparency: reduce)').matches)).toBe(true)
  await expect(glass).toHaveCSS('backdrop-filter', 'none')
  await cdp.detach()
})

test('Glass navigation surfaces share the configuration and forced colors remove transparency', async ({ page }, info) => {
  await open(page, 'swiftui-glass--navigation-surfaces', info.project.name.endsWith('dark'))
  const surfaces = page.locator('.sw-navigation-bar-leading, .sw-navigation-bar-trailing, .sw-tab-bar, .sw-toolbar-group:not(.sw-toolbar-group-center)')
  expect(await surfaces.count()).toBe(5)
  for (const surface of await surfaces.all()) await expect(surface).toHaveCSS('backdrop-filter', 'blur(20px) saturate(1.46)')
  await page.getByRole('button', { name: 'Document actions' }).click()
  await expect(page.getByRole('menu')).toHaveCSS('backdrop-filter', 'blur(20px) saturate(1.46)')
  const lastItem = page.getByRole('menuitem', { name: 'Duplicate' })
  await expect(lastItem).toBeVisible()
  expect(await lastItem.evaluate(node => {
    const rect = node.getBoundingClientRect()
    return node.contains(document.elementFromPoint(rect.x + rect.width / 2, rect.y + rect.height / 2))
  })).toBe(true)
  if (process.env.UI_AUDIT_CAPTURE) await page.screenshot({ path: `${process.env.UI_AUDIT_CAPTURE}/glass-navigation-${info.project.name}.png`, animations: 'disabled' })
  await page.emulateMedia({ forcedColors: 'active' })
  for (const surface of await surfaces.all()) await expect(surface).toHaveCSS('backdrop-filter', 'none')
  await expect(page.getByRole('menu')).toHaveCSS('backdrop-filter', 'none')
})

for (const [id, trigger, selector] of [
  ['swiftui-sheet--default', 'Show Sheet', '.sw-sheet'],
  ['swiftui-alert--default', 'Show Alert', '.sw-alert'],
  ['swiftui-confirmationdialog--default', 'Show Confirmation Dialog', '.sw-confirmation-dialog'],
  ['swiftui-menu--default', 'Options', '.sw-menu[role="menu"]'],
  ['swiftui-popover--default', 'Show Popover', '.sw-popover'],
] as const) {
  test(`${id}: entry and exit remain animated, then release the surface`, async ({ page }, info) => {
    await open(page, id, info.project.name.endsWith('dark'))
    await armMotion(page, selector)
    await page.getByRole('button', { name: trigger, exact: true }).click()
    const enter = await freezeMotion(page, selector)
    expect(enter.name).toMatch(/sw-(sheet|surface)-in/)
    expect(enter.duration).toBe('0.32s')
    if (selector === '.sw-sheet') expect(enter.translate).not.toBe('0px')
    await finishMotion(page, selector)
    await page.keyboard.press('Escape')
    await expect(page.locator(selector)).toHaveAttribute('data-state', 'closed')
    const exit = await freezeMotion(page, selector)
    expect(exit.name).toMatch(/sw-(sheet|surface)-out/)
    expect(exit.duration).toBe('0.2s')
    expect(await page.locator(selector).count()).toBe(1)
    await finishMotion(page, selector)
    await expect(page.locator(selector)).toHaveCount(0)
    await page.clock.resume()
    if (selector !== '.sw-popover') await expect(page.getByRole('button', { name: trigger, exact: true })).toBeFocused()
    await expect(page.locator('body')).not.toHaveAttribute('data-scroll-locked')
  })
}

test('Popover: reopen cancels pending removal and restores interaction', async ({ page }, info) => {
  await open(page, 'swiftui-popover--default', info.project.name.endsWith('dark'))
  await armMotion(page, '.sw-popover')
  const trigger = page.getByRole('button', { name: 'Show Popover' })
  await trigger.click()
  await page.keyboard.press('Escape')
  await freezeMotion(page, '.sw-popover')
  await trigger.click()
  await finishMotion(page, '.sw-popover')
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(await page.locator('.sw-popover').evaluate(node => (node as HTMLElement).inert)).toBe(false)
})

test('DisclosureGroup expands and collapses its content, preserving the accessible toggle', async ({ page }, info) => {
  await open(page, 'swiftui-disclosuregroup--default', info.project.name.endsWith('dark'))
  await armMotion(page, '.sw-disclosuregroup-region')
  const trigger = page.getByRole('button', { name: 'More Info' })
  await trigger.click()
  expect((await freezeMotion(page, '.sw-disclosuregroup-region')).name).toBe('sw-disclosure-in')
  await finishMotion(page, '.sw-disclosuregroup-region')
  await expect(page.getByRole('region')).toBeVisible()
  await trigger.click()
  expect((await freezeMotion(page, '.sw-disclosuregroup-region')).name).toBe('sw-disclosure-out')
  await expect(trigger).toHaveAttribute('aria-expanded', 'false')
  await finishMotion(page, '.sw-disclosuregroup-region')
  await expect(page.locator('.sw-disclosuregroup-region')).toHaveCount(0)
})

test('Navigation transition overrides work and disabled motion does not trap the stack', async ({ page }, info) => {
  await open(page, 'swiftui-navigationstack--transition-types', info.project.name.endsWith('dark'))
  await armMotion(page, '.sw-page[data-page-status="entering"]', false)
  for (const type of ['fade', 'scale', 'none', 'view-transition']) {
    await page.getByRole('button', { name: `Open ${type}`, exact: true }).click()
    if (type === 'fade' || type === 'scale') {
      const motion = await freezeMotion(page, '.sw-page[data-page-status="entering"]')
      expect(motion.name).toBe(type === 'fade' ? 'sw-fade-in' : 'sw-surface-in')
      expect(motion.duration).toBe('0.45s')
      // Direction only affects slides; fade/scale must retain their own effect.
      await page.locator('.sw-page[data-page-status="entering"]').evaluate(node => { (node as HTMLElement).dataset.transitionDirection = 'backwards' })
      await expect(page.locator('.sw-page[data-page-status="entering"]')).toHaveCSS('animation-name', motion.name)
      await finishMotion(page, '.sw-page[data-page-status="entering"]')
    }
    await expect(page.locator('.sw-navigationstack > .sw-page')).toHaveCount(1)
    await page.getByRole('button', { name: 'Return home' }).click()
    await expect(page.getByRole('button', { name: 'Open none', exact: true })).toBeVisible()
    await expect(page.locator('.sw-navigationstack > .sw-page')).toHaveCount(1)
  }
})

test('ContentTransition animates real content updates and cancels on Reduce Motion', async ({ page }, info) => {
  await open(page, 'swiftui-contenttransition--changing-content', info.project.name.endsWith('dark'))
  await page.getByRole('button', { name: 'Add item' }).click()
  const content = page.locator('.sw-contenttransition')
  await expect(content).toHaveText('1 items')
  await freezeMotion(page, '.sw-contenttransition')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await expect.poll(() => content.evaluate(node => node.getAnimations().length)).toBe(0)
  await page.getByRole('button', { name: 'Add item' }).click()
  await expect(content).toHaveText('2 items')
  expect(await content.evaluate(node => node.getAnimations().length)).toBe(0)
})

test('View Transition requests fall back to a CSS slide when the browser API is unavailable', async ({ page }, info) => {
  await page.addInitScript(() => Object.defineProperty(document, 'startViewTransition', { value: undefined, configurable: true }))
  await open(page, 'swiftui-navigationstack--transition-types', info.project.name.endsWith('dark'))
  await armMotion(page, '.sw-page[data-page-status="entering"]', false)
  await page.getByRole('button', { name: 'Open view-transition', exact: true }).click()
  const motion = await freezeMotion(page, '.sw-page[data-page-status="entering"]')
  expect(motion.name).toBe('sw-page-slide-in')
  await finishMotion(page, '.sw-page[data-page-status="entering"]')
  await expect(page.locator('.sw-navigationstack > .sw-page')).toHaveCount(1)
  await page.getByRole('button', { name: 'Return home' }).click()
  await expect(page.getByRole('button', { name: 'Open none', exact: true })).toBeVisible()
  await expect(page.locator('.sw-navigationstack > .sw-page')).toHaveCount(1)
})

test('Reduce Motion stops loops, pauses sequences and leaves presentation and navigation usable', async ({ page }, info) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  for (const id of ['swiftui-activityindicator--default', 'swiftui-symboleffect--pulse', 'swiftui-progressview--indeterminate']) {
    // Indicators keep a static, named status rather than speeding up an infinite loop.
    await open(page, id, info.project.name.endsWith('dark'))
    expect(await page.locator('#storybook-root').evaluate(node => node.getAnimations({ subtree: true }).length)).toBe(0)
  }
  await open(page, 'swiftui-phaseanimator--automatic', info.project.name.endsWith('dark'))
  await expect(page.getByText('idle', { exact: true })).toBeVisible()
  await page.waitForTimeout(1000)
  await expect(page.getByText('idle', { exact: true })).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'no-preference' })
  await expect(page.getByText('pressed', { exact: true })).toBeVisible()
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await open(page, 'swiftui-sheet--default', info.project.name.endsWith('dark'))
  const opener = page.getByRole('button', { name: 'Show Sheet' })
  await opener.click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(await page.locator('.sw-sheet').evaluate(node => node.getAnimations().length)).toBe(0)
  await page.keyboard.press('Escape')
  await expect(page.locator('.sw-sheet')).toHaveCount(0)
  await expect(opener).toBeFocused()
  await open(page, 'swiftui-navigationstack--transition-types', info.project.name.endsWith('dark'))
  for (const type of ['none', 'slide', 'view-transition']) {
    await page.getByRole('button', { name: `Open ${type}`, exact: true }).click()
    await expect(page.getByText('Transition detail')).toBeVisible()
    await expect(page.locator('.sw-navigationstack > .sw-page')).toHaveCount(1)
    await page.getByRole('button', { name: 'Return home' }).click()
    await expect(page.locator('.sw-navigationstack > .sw-page')).toHaveCount(1)
    await expect(page.getByRole('button', { name: 'Open none', exact: true })).toBeVisible()
  }
})

test('SymbolEffect honors an inactive effect without leaving a running loop', async ({ page }, info) => {
  await open(page, 'swiftui-symboleffect--inactive', info.project.name.endsWith('dark'))
  await expect(page.locator('.sw-symbol-effect')).toHaveAttribute('data-active', 'false')
  expect(await page.locator('.sw-symbol-effect').evaluate(node => node.getAnimations().length)).toBe(0)
})

test('ContextMenu shares paired presentation motion and removes closed items from interaction', async ({ page }, info) => {
  await open(page, 'swiftui-contextmenu--default', info.project.name.endsWith('dark'))
  await armMotion(page, '.sw-context-menu')
  await page.getByText('Right click this card').click({ button: 'right' })
  expect((await freezeMotion(page, '.sw-context-menu')).name).toBe('sw-surface-in')
  await finishMotion(page, '.sw-context-menu')
  await page.keyboard.press('Escape')
  expect((await freezeMotion(page, '.sw-context-menu')).name).toBe('sw-surface-out')
  expect(await page.locator('.sw-context-menu').evaluate(node => (node as HTMLElement).inert)).toBe(true)
  await finishMotion(page, '.sw-context-menu')
  await expect(page.locator('.sw-context-menu')).toHaveCount(0)
})

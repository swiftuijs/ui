import { test, expect, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

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

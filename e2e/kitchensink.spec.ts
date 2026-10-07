import { test as base, expect, type Locator, type Page } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { expectRefraction } from './glass.js'

const test = base.extend<{ healthyPage: Page }>({
  healthyPage: async ({ page }, use) => {
    const errors: string[] = []
    page.on('pageerror', error => errors.push(error.message))
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
    const response = await page.goto('/kitchensink/', { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    await expect(page.getByRole('heading', { name: 'A small workspace, made yours.' })).toBeVisible()
    await use(page)
    expect(errors).toEqual([])
  },
})
async function accessible(page: Page) {
  await page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'))
  const result = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze()
  expect(result.violations).toEqual([])
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true)
}
async function review(page: Page) {
  await page.getByRole('textbox', { name: 'Workspace name' }).fill('Design Studio')
  await page.getByRole('button', { name: 'Review changes' }).click()
  const sheet = page.getByRole('dialog', { name: 'Review workspace settings' })
  await expect(sheet).toBeVisible()
  await page.waitForFunction(() => document.getAnimations().every(animation => animation.playState !== 'running'))
  return sheet
}
async function drag(page: Page, handle: Locator, delta: number, touch: boolean) {
  const box = (await handle.boundingBox())!
  const x = box.x + box.width / 2, y = box.y + box.height / 2
  if (touch) {
    const session = await page.context().newCDPSession(page)
    await session.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
    for (let step = 1; step <= 10; step++) await session.send('Input.dispatchTouchEvent', {
      type: 'touchMove', touchPoints: [{ x, y: y + delta * step / 10 }],
    })
    await session.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    await session.detach()
  } else {
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x, y + delta, { steps: 10 })
    await page.mouse.up()
  }
}

test('adaptive form saves, resets and keeps modal focus isolated', async ({ healthyPage: page }) => {
  await accessible(page)
  const sheet = await review(page)
  const box = (await sheet.boundingBox())!, width = page.viewportSize()!.width
  if (width < 768) {
    expect(box.width).toBe(width)
    expect(box.y + box.height).toBe(page.viewportSize()!.height)
  } else expect(box.width).toBeLessThanOrEqual(420)
  expect(Math.abs(box.x + box.width / 2 - width / 2)).toBeLessThan(1)
  for (let index = 0; index < 8; index++) {
    await page.keyboard.press('Tab')
    expect(await sheet.evaluate(element => element.contains(document.activeElement))).toBe(true)
  }
  await accessible(page)
  await page.keyboard.press('Escape')
  await expect(page.getByRole('button', { name: 'Review changes' })).toBeFocused()
  await page.getByRole('button', { name: 'Review changes' }).click()
  await page.getByRole('button', { name: 'Save preferences' }).click()
  await expect(page.getByRole('alertdialog', { name: 'Preferences saved' })).toBeVisible()
  await accessible(page)
  await page.getByRole('button', { name: 'OK', exact: true }).click()
  await expect(page.getByRole('status')).toHaveText('Everything is up to date.')
  await page.getByRole('button', { name: 'Reset', exact: true }).click()
  await accessible(page)
  await page.getByRole('button', { name: 'Reset preferences', exact: true }).click()
  await expect(page.getByRole('textbox', { name: 'Workspace name' })).toHaveValue('Studio workspace')
  if (width < 1024) {
    await page.getByRole('button', { name: 'Details', exact: true }).click()
    await expect(page.getByRole('heading', { name: 'Studio workspace' })).toBeVisible()
    await page.getByRole('button', { name: 'Content', exact: true }).click()
    await expect(page.getByRole('textbox', { name: 'Workspace name' })).toBeVisible()
  }
})

test('1,000 projects use a bounded DOM window and the last item remains reachable', async ({ healthyPage: page }) => {
  await page.getByRole('button', { name: 'Browse 1,000 projects' }).click()
  const scroller = page.getByRole('region', { name: 'Projects', exact: true })
  await expect(scroller.getByText('Project 0001')).toBeVisible()
  expect(await scroller.locator('.kitchen-project').count()).toBeLessThan(30)
  await scroller.evaluate(element => { element.scrollTop = element.scrollHeight })
  await expect(scroller.getByText('Project 1000')).toBeVisible()
  expect(await scroller.locator('.kitchen-project').count()).toBeLessThan(30)
  await accessible(page)
  await scroller.evaluate(element => { element.scrollTop = 0 })
  await expect(scroller.getByText('Project 0001')).toBeVisible()
})

test('appearance options update glass, theme and portal surfaces independently of form edits', async ({ healthyPage: page }, info) => {
  if (process.env.UI_AUDIT_CAPTURE) await page.screenshot({ path: `${process.env.UI_AUDIT_CAPTURE}/kitchensink-default-${info.project.name}.png`, fullPage: true, animations: 'disabled' })
  await page.getByRole('button', { name: 'Appearance options' }).click()
  const region = page.getByRole('region', { name: 'Appearance options' })
  const regionBox = (await region.boundingBox())!
  const pickerBox = (await page.getByLabel('Theme', { exact: true }).boundingBox())!
  expect(pickerBox.y - regionBox.y).toBeGreaterThanOrEqual(12)
  await page.getByLabel('Theme', { exact: true }).selectOption('dark')
  await page.getByRole('switch', { name: 'Liquid Glass', exact: true }).check()
  const header = page.locator('.kitchen-header')
  await expect(header).toHaveAttribute('data-glass', 'on')
  await expectRefraction(header, 20)
  const preview = page.getByRole('group', { name: 'Glass material preview' })
  await expect(preview.getByText('Regular material', { exact: true })).toBeVisible()
  await page.getByLabel('Material', { exact: true }).selectOption('clear')
  await expect(header).toHaveAttribute('data-glass-variant', 'clear')
  await expect(preview.getByText('Clear material', { exact: true })).toBeVisible()
  await expectRefraction(header, 2)
  await expect(page.getByRole('status')).toHaveText('Everything is up to date.')
  await accessible(page)
  if (process.env.UI_AUDIT_CAPTURE) await page.screenshot({ path: `${process.env.UI_AUDIT_CAPTURE}/kitchensink-glass-dark-${info.project.name}.png`, fullPage: true, animations: 'disabled' })
  const sheet = await review(page)
  await expect(sheet).toHaveAttribute('data-theme', 'dark')
  await expect(sheet.locator('.sw-sheet-content')).toHaveAttribute('data-glass', 'on')
  await expect(sheet.locator('.sw-sheet-content')).toHaveAttribute('data-glass-variant', 'regular')
  await expectRefraction(sheet.locator('.sw-sheet-content'), 20)
  await accessible(page)
  await page.keyboard.press('Escape')
  await page.getByRole('slider', { name: 'Glass intensity' }).focus()
  await page.keyboard.press('Home')
  await expect(header).toHaveAttribute('data-glass', 'off')
  await expect(header).toHaveCSS('backdrop-filter', 'none')
  await expect(preview.getByText('Solid surface', { exact: true })).toBeVisible()
  await page.getByLabel('Theme', { exact: true }).selectOption('light')
  await expect(page.locator('.kitchen-workspace')).toHaveCSS('color', 'rgb(0, 0, 0)')
  await accessible(page)
})

test('sheet pointer dragging snaps, dismisses and preserves keyboard activation', async ({ healthyPage: page }, testInfo) => {
  const sheet = await review(page)
  const handle = sheet.getByRole('button', { name: 'Adjust sheet height' })
  const touch = Boolean(testInfo.project.use.hasTouch)
  await drag(page, handle, -360, touch)
  await expect(sheet).toHaveAttribute('data-selected-detent', 'large')
  // Selection changes before the height transition settles. Start the next
  // gesture at the settled detent, then retry geometry rather than sleeping.
  const largeHeight = page.viewportSize()!.width < 768 ? 900 : 640
  await expect.poll(async () => Math.abs((await sheet.boundingBox())!.height - largeHeight)).toBeLessThan(2)
  await drag(page, handle, (await sheet.boundingBox())!.height - 500, touch)
  await expect(sheet).toHaveAttribute('data-selected-detent', 'medium')
  await expect.poll(async () => Math.abs((await sheet.boundingBox())!.height - 500)).toBeLessThan(2)
  await handle.focus()
  await page.keyboard.press('Enter')
  await expect(sheet).toHaveAttribute('data-selected-detent', 'large')
  await page.keyboard.press('Space')
  await expect(sheet).toHaveAttribute('data-selected-detent', 'medium')
  await accessible(page)
  await drag(page, handle, 430, touch)
  await expect(sheet).toBeHidden()
  await expect(page.getByRole('button', { name: 'Review changes' })).toBeFocused()
})

test('all four lazy layouts scroll with bounded DOM and preserve grid spacing', async ({ page }) => {
  const errors: string[] = []
  page.on('pageerror', error => errors.push(error.message))
  page.on('console', message => { if (message.type() === 'error') errors.push(message.text()) })
  for (const name of ['lazyvstack', 'lazyhstack', 'lazyvgrid', 'lazyhgrid']) {
    const response = await page.goto(`/docs/components/${name}/`, { waitUntil: 'networkidle' })
    expect(response?.status()).toBe(200)
    const root = page.locator(`.sw-${name}`).first()
    await expect(root).toBeVisible()
    expect((await root.boundingBox())!.height).toBeGreaterThan(0)
    expect(await root.locator('[data-sw-lazy-row]').count()).toBeLessThan(60)
    const horizontal = name.startsWith('lazyh')
    await root.evaluate((element, horizontal) => {
      const scroller = element.closest('.sw-scrollview')!
      if (horizontal) scroller.scrollLeft = 5000
      else scroller.scrollTop = 5000
    }, horizontal)
    await expect.poll(() => root.locator('[data-sw-lazy-row]').first().getAttribute('data-index').then(Number)).toBeGreaterThan(20)
    expect(await root.locator('[data-sw-lazy-row]').count()).toBeLessThan(60)
    if (name === 'lazyhgrid') {
      const row = root.locator('[data-sw-lazy-row]').first()
      const gap = await row.evaluate(element => {
        const a = element.children[0].getBoundingClientRect(), b = element.children[1].getBoundingClientRect()
        return b.top - a.bottom
      })
      expect(Math.abs(gap - 8)).toBeLessThan(1)
    }
  }
  expect(errors).toEqual([])
})

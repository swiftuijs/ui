import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

const components = [
  'sheet',
  'toggle',
  'glass',
  'uiprovider',
  'picker',
  'lazyvstack',
  'viewthatfits',
  'navigationlink',
  'navigationstack',
  'page/standard-page/standardpage',
]

for (const slug of components) {
  test(`${slug} shows usable code and keeps requirements ahead of API`, async ({
    page,
  }) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    const response = await page.goto(`/docs/components/${slug}/`)
    expect(response?.status()).toBe(200)
    await expect(page.locator('h1')).toHaveCount(1)
    await expect(
      page.getByText('Loading preview…', { exact: true }),
    ).toHaveCount(0)
    await expect(
      page.getByText("This preview couldn't be loaded.", { exact: true }),
    ).toHaveCount(0)
    const main = page.locator('#nd-page')
    const code = main.locator('pre code').first()
    await expect(code).toBeVisible()
    await expect(code).toContainText('export default function Example')
    const notes = main.getByRole('heading', {
      name: 'Usage and limitations',
      exact: true,
    })
    await expect(notes).toHaveCount(1)
    expect(
      await notes.evaluate(
        (element) =>
          !!(
            element.compareDocumentPosition(document.querySelector('#api')!) &
            Node.DOCUMENT_POSITION_FOLLOWING
          ),
      ),
    ).toBe(true)
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true)
    expect(errors).toEqual([])
  })
}

test('the component index keeps every reference reachable', async ({
  page,
  request,
}) => {
  await page.goto('/docs/components/')
  const links = page.locator('#nd-page .prose li a[href^="/docs/components/"]')
  await expect(links).toHaveCount(120)
  for (const href of await links.evaluateAll((elements) =>
    elements.map((element) => element.getAttribute('href')!),
  )) {
    const response = await request.get(href.endsWith('/') ? href : `${href}/`)
    expect(response.status(), href).toBe(200)
    // Component pages are generated; editing must point at the original MDX.
    const editPath = (await response.text()).match(
      /href="https:\/\/github\.com\/swiftuijs\/ui\/edit\/main\/([^"]+)"/,
    )?.[1]
    expect(editPath, href).toBeTruthy()
    expect(existsSync(resolve(decodeURIComponent(editPath!))), href).toBe(true)
  }
})

test('GitHub and project resources remain discoverable on home and documentation pages', async ({
  page,
}) => {
  for (const path of [
    '/',
    '/docs/getting-started/',
    '/docs/components/button/',
  ]) {
    await page.goto(path)
    const github = page.locator('header').getByRole('link', { name: /GitHub/ })
    await expect(github).toHaveAttribute(
      'href',
      'https://github.com/swiftuijs/ui',
    )
    await expect(github).toBeInViewport()
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(github).toBeInViewport()
    expect((await page.locator('header').first().boundingBox())?.y).toBe(0)
    const resources = page.getByRole('navigation', {
      name: 'Project resources',
    })
    await expect(
      resources.getByRole('link', { name: 'npm', exact: true }),
    ).toHaveAttribute('href', 'https://www.npmjs.com/package/@swiftuijs/ui')
    await expect(
      resources.getByRole('link', { name: 'MIT license' }),
    ).toHaveAttribute(
      'href',
      'https://github.com/swiftuijs/ui/blob/main/LICENSE',
    )
  }
})

test('home has a working example, copyable install and code, and a direct start path', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  const errors: string[] = []
  page.on('pageerror', (error) => errors.push(error.message))
  await page.goto('/')
  await page.getByRole('button', { name: 'Add one', exact: true }).click()
  await expect(page.getByText('1 clicks', { exact: true })).toBeVisible()
  const installation = page.getByRole('region', {
    name: 'Installation command',
  })
  await installation
    .locator('..')
    .getByRole('button', { name: 'Copy Text', exact: true })
    .click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe('npm install @swiftuijs/ui')
  const code = page.getByRole('region', { name: 'Counter example code' })
  if (page.viewportSize()!.width < 1024) {
    await page.getByRole('button', { name: 'View example code' }).click()
  }
  const source = await code.locator('pre').textContent()
  await code
    .locator('..')
    .getByRole('button', { name: 'Copy Text', exact: true })
    .click()
  await expect
    .poll(() => page.evaluate(() => navigator.clipboard.readText()))
    .toBe(source)
  expect(source).toContain("import '@swiftuijs/ui/style/index.css'")
  await page.getByRole('link', { name: 'Get started', exact: true }).click()
  await expect(page.locator('h1')).toHaveText('Getting Started')
  await expect(page.locator('#nd-page')).toContainText(
    'Requires React 18.2+ or 19',
  )
  expect(errors).toEqual([])
})

test('responsive navigation, theme and search work from the homepage and docs shell', async ({
  page,
}) => {
  await page.goto('/')
  if (page.viewportSize()!.width < 768) {
    await page.getByRole('button', { name: 'Open navigation' }).click()
    await page
      .getByRole('navigation', { name: 'Mobile navigation' })
      .getByRole('link', { name: 'Documentation', exact: true })
      .click()
  } else {
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Documentation', exact: true })
      .click()
  }
  await expect(page.locator('h1')).toHaveText('Overview')
  if (page.viewportSize()!.width < 640) {
    await page
      .getByRole('button', { name: 'Toggle documentation navigation' })
      .click()
  }
  await page.getByRole('button', { name: 'Toggle Theme' }).click()
  await expect(page.locator('html')).toHaveClass(/dark/)
  await page.getByRole('button', { name: 'Toggle Theme' }).click()
  await expect(page.locator('html')).not.toHaveClass(/dark/)
  if (page.viewportSize()!.width < 640) {
    await page
      .getByRole('button', { name: 'Open Sidebar', exact: true })
      .click()
  }
  await page
    .locator('header')
    .getByRole('button', { name: /search/i })
    .click()
  await page.getByRole('dialog').getByPlaceholder('Search').fill('Button')
  await page
    .getByRole('dialog')
    .getByRole('button', {
      name: 'Documentation Components Button',
      exact: true,
    })
    .click()
  await expect(page.locator('h1')).toHaveText('Button')
})

test('keyboard readers can skip navigation and shell passes accessibility checks in both themes', async ({
  page,
}) => {
  for (const path of ['/', '/docs/getting-started/']) {
    await page.goto(path)
    await page.keyboard.press('Tab')
    await expect(
      page.getByRole('link', { name: 'Skip to content' }),
    ).toBeFocused()
    await page.keyboard.press('Enter')
    await expect(
      page.locator(path === '/' ? '#main-content' : '#nd-page'),
    ).toBeFocused()
    for (const theme of ['light', 'dark']) {
      // Exercise the resulting colors at mobile too without opening a drawer.
      await page.evaluate((value) => {
        localStorage.setItem('theme', value)
      }, theme)
      await page.reload()
      await expect(page.locator('html')).toHaveClass(new RegExp(theme))
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze()
      expect(
        results.violations.map(({ id, nodes }) => ({
          id,
          targets: nodes.map((n) => n.target),
        })),
      ).toEqual([])
    }
  }
})

test('the header stays usable at narrow mobile and tablet widths', async ({
  page,
}) => {
  for (const width of [320, 768]) {
    await page.setViewportSize({ width, height: 1000 })
    for (const path of ['/', '/docs/getting-started/']) {
      await page.goto(path)
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true)
      const github = page
        .locator('header')
        .getByRole('link', { name: /GitHub/ })
      await expect(github).toBeInViewport({ ratio: 1 })
      await expect(
        page.locator('header').getByRole('button', { name: /search/i }),
      ).toBeInViewport({ ratio: 1 })
    }
  }
})

test('examples respond to interaction, copy complete code, and mount variants on demand', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write'])
  await page.goto('/docs/components/toggle/')
  const main = page.locator('#nd-page')
  const toggle = main.getByRole('switch').first()
  await expect(toggle).toBeVisible()
  const checked = await toggle.isChecked()
  await toggle.click()
  await expect(toggle).toBeChecked({ checked: !checked })
  const code = await main.locator('pre code').first().textContent()
  await main
    .getByRole('button', { name: 'Copy code', exact: true })
    .first()
    .click()
  await expect(
    main.getByRole('button', { name: 'Copied', exact: true }),
  ).toBeVisible()
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(code)
  await page.goto('/docs/components/sheet/')
  const extra = main.locator('article > details').nth(1)
  await expect(extra).not.toHaveAttribute('open', '')
  await extra.locator('summary').first().click()
  await expect(extra.getByRole('button', { name: /show/i })).toBeVisible()
})

test('readers can navigate from onboarding to requirements and search for a component', async ({
  page,
}) => {
  await page.goto('/docs/getting-started/')
  await expect(page.locator('h1')).toHaveText('Getting Started')
  await expect(page.locator('#nd-page')).toContainText(
    'Requires React 18.2+ or 19',
  )
  await expect(page.locator('#nd-page')).toContainText(
    'Keep react and react-dom on the same version',
  )
  await page
    .locator('#nd-page')
    .getByRole('link', { name: 'capability matrix', exact: true })
    .click()
  await expect(page.locator('h1')).toHaveText('Capability Matrix')
  // Fumadocs exposes the same search dialog to desktop and mobile readers.
  await page
    .getByRole('button', { name: /search/i })
    .first()
    .click()
  const search = page.getByRole('dialog').getByPlaceholder('Search')
  await search.fill('Sheet')
  await page
    .getByRole('dialog')
    .getByRole('button', {
      name: 'Documentation Components Sheet',
      exact: true,
    })
    .click()
  await expect(page.locator('h1')).toHaveText('Sheet')
})

import { test, expect } from '@playwright/test'

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
  await expect(page.locator('#nd-page')).toContainText('Requires React 18.2+ or 19')
  await expect(page.locator('#nd-page')).toContainText('Keep react and react-dom on the same version')
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

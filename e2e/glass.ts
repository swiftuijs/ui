import { expect, type Locator } from '@playwright/test'

/** Assert the actual decorative renderer, while the interactive host stays unfiltered. */
export async function expectRefraction(surface: Locator, blur: number) {
  await expect(surface.locator(':scope > .sw-glass-backdrop')).toHaveAttribute('data-ready', 'true')
  await expect(surface).toHaveCSS('backdrop-filter', 'none')
  await expect(surface.locator(':scope > .sw-glass-backdrop feGaussianBlur')).toHaveAttribute('stdDeviation', String(blur))
  await expect(surface.locator(':scope > .sw-glass-backdrop .sw-glass-optics')).toHaveCSS('backdrop-filter', /url\(.+sw-glass-/)
}

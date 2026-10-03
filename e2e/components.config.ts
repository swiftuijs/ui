import { defineConfig } from '@playwright/test'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  testDir: '.', testMatch: 'components.spec.ts', fullyParallel: true, workers: 2,
  timeout: 30_000, reporter: [['list'], ['html', { open: 'never', outputFolder: 'playwright-report/components' }]],
  use: { baseURL: 'http://127.0.0.1:3104', trace: 'retain-on-failure', screenshot: 'only-on-failure',
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE } },
  projects: [
    { name: 'mobile-light', use: { viewport: { width: 390, height: 844 }, hasTouch: true, colorScheme: 'light' } },
    { name: 'desktop-dark', use: { viewport: { width: 1024, height: 844 }, colorScheme: 'dark' } },
  ],
  webServer: { command: 'node scripts/serve-docs.mjs', cwd: fileURLToPath(new URL('..', import.meta.url)),
    env: { STATIC_ROOT: 'apps/storybook/storybook-static', STATIC_PORT: '3104' },
    url: 'http://127.0.0.1:3104', reuseExistingServer: false },
})

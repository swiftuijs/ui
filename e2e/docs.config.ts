import { defineConfig } from '@playwright/test'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  testDir: '.',
  testMatch: 'docs.spec.ts',
  fullyParallel: true,
  workers: 2,
  timeout: 30_000,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: 'http://127.0.0.1:3107',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
    },
  },
  projects: [390, 1440].map((width) => ({
    name: `${width}px`,
    use: { viewport: { width, height: 1000 }, hasTouch: width < 768 },
  })),
  webServer: {
    command: 'node scripts/serve-docs.mjs',
    env: { STATIC_PORT: '3107' },
    cwd: fileURLToPath(new URL('..', import.meta.url)),
    url: 'http://127.0.0.1:3107',
    reuseExistingServer: false,
  },
})

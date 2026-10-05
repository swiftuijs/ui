import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';

export default defineConfig({
  // Match the workspace test renderer when the docs runtime pins a different React patch.
  resolve: { alias: {
    react: fileURLToPath(new URL('../../node_modules/react', import.meta.url)),
    'react-dom': fileURLToPath(new URL('../../node_modules/react-dom', import.meta.url)),
  } },
  esbuild: { jsx: 'automatic' },
  test: {
    environment: 'node',
    globals: true,
    include: ['lib/**/*.test.ts', 'lib/**/*.test.tsx', 'scripts/lib/**/*.test.ts'],
  },
});

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      src: '/src',
      '~style': '/src/style',
    },
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: 'src/index.tsx',
      name: 'swiftui',
      formats: ['es', 'umd'],
      fileName: (format) => `index.${format}.js`,
    },
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true
    }),
  ],
})

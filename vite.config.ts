import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'

const commonConfig = {
  resolve: {
    alias: {
      src: '/src',
      '~style': '/src/style',
    },
  },
  plugins: [
    react(),
    dts({
      rollupTypes: true
    }),
  ],
}

// https://vitejs.dev/config/
export default defineConfig((env) => {
  if (env.mode === 'production') {
    return {
      ...commonConfig,
      build: {
        outDir: 'dist',
        lib: {
          entry: 'src/index.tsx',
          name: 'swiftui',
          formats: ['es', 'umd'],
          fileName: (format) => `index.${format}.js`,
        },
      },
    }
  }

  return {
    ...commonConfig,
    root: './',
    server: {
      host: true,
      open: 'demo/index.html'
    },
    build: {
      rollupOptions: {
        input: {
          main: 'demo/index.html',
        },
      }
    }
  }
})
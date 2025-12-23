import type { StorybookConfig } from "@storybook/react-vite"
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'
import remarkGfm from 'remark-gfm'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const config: StorybookConfig = {
  stories: [
    "../docs-source/**/*.mdx",
    "../src/**/*.mdx",
    "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../src/**/stories.@(js|jsx|mjs|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-onboarding",
    "@storybook/addon-links",
    "@chromatic-com/storybook",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    }
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (config, { configType }) => {
    // Ensure proper path resolution for MDX files
    if (!config.resolve) {
      config.resolve = {}
    }
    
    if (!config.resolve.alias) {
      config.resolve.alias = {}
    }
    
    // Ensure src alias is properly configured
    config.resolve.alias = {
      ...config.resolve.alias,
      src: resolve(__dirname, '../src'),
      '~style': resolve(__dirname, '../src/style'),
    }

    // Modify the Vite config for production builds
    if (configType === 'PRODUCTION') {
      // Ensure proper cache busting for production builds
      if (!config.build) {
        config.build = {}
      }

      // Configure rollup output with hash-based filenames for cache busting
      if (!config.build.rollupOptions) {
        config.build.rollupOptions = {}
      }

      // Ensure output configuration exists
      const existingOutput = config.build.rollupOptions.output
      const isArray = Array.isArray(existingOutput)
      const outputConfig = isArray ? existingOutput[0] : existingOutput || {}

      config.build.rollupOptions.output = {
        ...outputConfig,
        // Use hash in chunk file names for cache busting
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || []
          const ext = info[info.length - 1]
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `assets/images/[name]-[hash][extname]`
          }
          if (/woff2?|eot|ttf|otf/i.test(ext)) {
            return `assets/fonts/[name]-[hash][extname]`
          }
          return `assets/[name]-[hash][extname]`
        },
        // Manual chunk splitting for better caching
        manualChunks: (id) => {
          // Split vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react'
            }
            if (id.includes('@storybook')) {
              return 'vendor-storybook'
            }
            return 'vendor'
          }
        },
      }

      // Disable source maps for smaller builds
      config.build.sourcemap = false

      // Optimize chunk size
      config.build.chunkSizeWarningLimit = 1000

      // Ensure proper minification
      config.build.minify = 'esbuild'
    }

    return config
  },
}
export default config

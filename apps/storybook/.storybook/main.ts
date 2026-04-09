import type { StorybookConfig } from '@storybook/react-vite'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import remarkGfm from 'remark-gfm'

const __dirname = dirname(fileURLToPath(import.meta.url))
const uiRoot = resolve(__dirname, '../../../packages/ui')

const config: StorybookConfig = {
  stories: ['../../../packages/ui/src/**/*.stories.@(ts|tsx|mdx)'],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  viteFinal: async (config) => {
    const existingAlias = config.resolve?.alias

    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: [
          ...(Array.isArray(existingAlias) ? existingAlias : []),
          ...(existingAlias && !Array.isArray(existingAlias)
            ? Object.entries(existingAlias).map(([find, replacement]) => ({
                find,
                replacement,
              }))
            : []),
          { find: '@', replacement: resolve(uiRoot, 'src') },
          { find: '@style', replacement: resolve(uiRoot, 'src/style') },
          { find: '@swiftuijs/ui', replacement: resolve(uiRoot, 'src/index.tsx') },
        ],
      },
    }
  },
}

export default config

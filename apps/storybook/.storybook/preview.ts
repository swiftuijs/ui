import type { Preview } from '@storybook/react-vite'

import '../../../packages/ui/src/style/index.scss'

const preview: Preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      toc: true,
    },
    layout: 'padded',
    options: {
      storySort: {
        method: 'alphabetical',
      },
    },
  },
}

export default preview

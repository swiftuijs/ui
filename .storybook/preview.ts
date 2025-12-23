import type { Preview } from "@storybook/react-vite"
import './style.scss'

const preview: Preview = {
  tags: ['autodocs'],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          // Documentation - in developer reading order
          'Introduction',
          'Getting Started',
          'Components',
          'Layout',
          'Responsive',
          'Theming',
          'Component Index',
          // Component stories
          'SwiftUI',
        ],
      },
    },
  },
}

export default preview

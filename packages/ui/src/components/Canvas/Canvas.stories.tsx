import type { Meta, StoryObj } from '@storybook/react-vite'

import { Canvas } from '.'

const meta = {
  title: 'SwiftUI/Canvas',
  component: Canvas,
  args: {
    'aria-label': 'Example canvas',
    height: 180,
    width: 320,
  },
} satisfies Meta<typeof Canvas>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Canvas
      {...args}
      draw={(context) => {
        context.fillStyle = '#007AFF'
        context.fillRect(16, 16, 288, 148)
      }}
    />
  ),
}

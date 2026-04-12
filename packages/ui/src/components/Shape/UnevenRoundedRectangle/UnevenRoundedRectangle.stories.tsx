import type { Meta, StoryObj } from '@storybook/react-vite'

import { UnevenRoundedRectangle, type IUnevenRoundedRectangleProps } from '.'

const meta: Meta<typeof UnevenRoundedRectangle> = {
  title: 'SwiftUI/Shape/UnevenRoundedRectangle',
  component: UnevenRoundedRectangle,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IUnevenRoundedRectangleProps>

export const Default: Story = {
  args: {
    fill: '#0a84ff',
    cornerRadii: {
      topLeading: 24,
      topTrailing: 8,
      bottomLeading: 12,
      bottomTrailing: 32,
    },
    style: { width: '180px', height: '120px' },
  },
}

export const WithStroke: Story = {
  args: {
    fill: '#5e5ce6',
    stroke: '#312e81',
    strokeWidth: 3,
    cornerRadii: {
      topLeading: 32,
      topTrailing: 32,
      bottomLeading: 8,
      bottomTrailing: 8,
    },
    style: { width: '180px', height: '120px' },
  },
}

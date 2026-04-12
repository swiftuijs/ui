import type { Meta, StoryObj } from '@storybook/react-vite'

import { Capsule, type ICapsuleProps } from './index'

const meta: Meta<typeof Capsule> = {
  title: 'SwiftUI/Shape/Capsule',
  component: Capsule,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ICapsuleProps>

export const Default: Story = {
  args: {
    fill: '#007aff',
    style: { width: 180, height: 64 },
  },
}

export const WithStroke: Story = {
  args: {
    fill: '#e0f2fe',
    stroke: '#0284c7',
    strokeWidth: 2,
    style: { width: 200, height: 72 },
  },
}

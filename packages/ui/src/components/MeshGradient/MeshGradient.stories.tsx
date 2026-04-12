import type { Meta, StoryObj } from '@storybook/react'

import { MeshGradient } from '.'

const meta: Meta<typeof MeshGradient> = {
  title: 'SwiftUI/MeshGradient',
  component: MeshGradient,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof MeshGradient>

export const Default: Story = {
  args: {
    width: 320,
    height: 200,
    colors: ['#ff375f', '#5e5ce6', '#30d158', '#ffd60a'],
    points: [
      [0.15, 0.2],
      [0.8, 0.25],
      [0.35, 0.82],
      [0.82, 0.75],
    ],
    style: {
      borderRadius: '24px',
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { RadialGradient, type IRadialGradientProps } from '.'

const meta: Meta<typeof RadialGradient> = {
  title: 'SwiftUI/RadialGradient',
  component: RadialGradient,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IRadialGradientProps>

export const Default: Story = {
  args: {
    center: 'center',
    endRadius: 120,
    startRadius: 0,
    stops: [
      { color: '#ffd60a', location: 0 },
      { color: '#ff375f', location: 0.55 },
      { color: '#5e5ce6', location: 1 },
    ],
    style: {
      borderRadius: '20px',
      height: '220px',
      width: '100%',
    },
  },
}

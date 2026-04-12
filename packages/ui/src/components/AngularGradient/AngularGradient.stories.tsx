import type { Meta, StoryObj } from '@storybook/react-vite'

import { AngularGradient, type IAngularGradientProps } from '.'

const meta: Meta<typeof AngularGradient> = {
  title: 'SwiftUI/AngularGradient',
  component: AngularGradient,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IAngularGradientProps>

export const Default: Story = {
  args: {
    center: 'center',
    endAngle: 360,
    startAngle: 0,
    stops: [
      { color: '#ff9f0a', location: 0 },
      { color: '#ff375f', location: 0.35 },
      { color: '#5e5ce6', location: 0.7 },
      { color: '#30d158', location: 1 },
    ],
    style: {
      borderRadius: '999px',
      height: '220px',
      width: '220px',
    },
  },
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { LinearGradient, type ILinearGradientProps } from '.'

const meta: Meta<typeof LinearGradient> = {
  title: 'SwiftUI/LinearGradient',
  component: LinearGradient,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ILinearGradientProps>

export const Default: Story = {
  args: {
    endPoint: 'bottomTrailing',
    startPoint: 'topLeading',
    stops: [
      { color: '#0a84ff', location: 0 },
      { color: '#64d2ff', location: 0.45 },
      { color: '#30d158', location: 1 },
    ],
    style: {
      borderRadius: '20px',
      height: '220px',
      width: '100%',
    },
  },
}

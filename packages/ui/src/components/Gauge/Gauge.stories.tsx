import type { Meta, StoryObj } from '@storybook/react-vite'

import { Gauge, type IGaugeProps } from '.'

const meta: Meta<typeof Gauge> = {
  title: 'SwiftUI/Gauge',
  component: Gauge,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IGaugeProps>

export const Default: Story = {
  args: {
    label: 'Storage',
    value: 64,
    min: 0,
    max: 128,
    currentValueLabel: '64 GB',
    minimumValueLabel: '0 GB',
    maximumValueLabel: '128 GB',
  },
}

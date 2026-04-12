import type { Meta, StoryObj } from '@storybook/react-vite'

import { Ellipse, type IEllipseProps } from './index'

const meta: Meta<typeof Ellipse> = {
  title: 'SwiftUI/Shape/Ellipse',
  component: Ellipse,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IEllipseProps>

export const Default: Story = {
  args: {
    fill: '#34c759',
    style: { width: 180, height: 120 },
  },
}

export const WithStroke: Story = {
  args: {
    fill: '#dcfce7',
    stroke: '#15803d',
    strokeWidth: 3,
    style: { width: 200, height: 120 },
  },
}

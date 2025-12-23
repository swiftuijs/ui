import type { Meta, StoryObj } from '@storybook/react-vite'
import { Circle, type ICircleProps } from '.'

const meta: Meta<typeof Circle> = {
  title: 'SwiftUI/Shape/Circle',
  component: Circle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A circular shape.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ICircleProps>

export const Default: Story = {
  args: {
    fill: '#007AFF',
    style: { width: '100px', height: '100px' },
  },
}

export const WithStroke: Story = {
  args: {
    fill: '#007AFF',
    stroke: '#0051D5',
    strokeWidth: 3,
    style: { width: '100px', height: '100px' },
  },
}


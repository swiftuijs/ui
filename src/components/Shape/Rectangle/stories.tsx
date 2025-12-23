import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../../'
import { Rectangle, type IRectangleProps } from '.'

const meta: Meta<typeof Rectangle> = {
  title: 'SwiftUI/Shape/Rectangle',
  component: Rectangle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A rectangular shape.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IRectangleProps>

export const Default: Story = {
  args: {
    fill: '#007AFF',
    style: { width: '200px', height: '100px' },
  },
}

export const WithStroke: Story = {
  args: {
    fill: '#007AFF',
    stroke: '#0051D5',
    strokeWidth: 2,
    style: { width: '200px', height: '100px' },
  },
}

export const Colors: Story = {
  render: () => (
    <VStack spacing={10}>
      <HStack spacing={10}>
        <Rectangle fill="#007AFF" style={{ width: '100px', height: '50px' }} />
        <Text>Blue</Text>
      </HStack>
      <HStack spacing={10}>
        <Rectangle fill="#34C759" style={{ width: '100px', height: '50px' }} />
        <Text>Green</Text>
      </HStack>
      <HStack spacing={10}>
        <Rectangle fill="#FF9500" style={{ width: '100px', height: '50px' }} />
        <Text>Orange</Text>
      </HStack>
    </VStack>
  ),
}


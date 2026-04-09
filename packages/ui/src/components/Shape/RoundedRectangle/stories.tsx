import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text } from '../../'
import { RoundedRectangle, type IRoundedRectangleProps } from '.'

const meta: Meta<typeof RoundedRectangle> = {
  title: 'SwiftUI/Shape/RoundedRectangle',
  component: RoundedRectangle,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A rectangular shape with rounded corners.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IRoundedRectangleProps>

export const Default: Story = {
  args: {
    fill: '#007AFF',
    cornerRadius: 12,
    style: { width: '200px', height: '100px' },
  },
}

export const DifferentRadius: Story = {
  render: () => (
    <VStack spacing={10}>
      <VStack spacing={5}>
        <RoundedRectangle fill="#007AFF" cornerRadius={4} style={{ width: '200px', height: '50px' }} />
        <Text>Radius: 4</Text>
      </VStack>
      <VStack spacing={5}>
        <RoundedRectangle fill="#007AFF" cornerRadius={12} style={{ width: '200px', height: '50px' }} />
        <Text>Radius: 12</Text>
      </VStack>
      <VStack spacing={5}>
        <RoundedRectangle fill="#007AFF" cornerRadius={20} style={{ width: '200px', height: '50px' }} />
        <Text>Radius: 20</Text>
      </VStack>
    </VStack>
  ),
}


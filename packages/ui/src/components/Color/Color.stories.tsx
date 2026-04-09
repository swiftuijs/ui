import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../'
import { Color, type IColorProps } from '.'

const meta: Meta<typeof Color> = {
  title: 'SwiftUI/Color',
  component: Color,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that displays a solid color.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IColorProps>

export const Default: Story = {
  args: {
    color: '#007AFF',
    style: { width: '200px', height: '100px' },
  },
}

export const ColorPalette: Story = {
  render: () => (
    <VStack spacing={10}>
      <HStack spacing={10}>
        <Color color="#007AFF" style={{ width: '100px', height: '50px' }} />
        <Text>Blue</Text>
      </HStack>
      <HStack spacing={10}>
        <Color color="#34C759" style={{ width: '100px', height: '50px' }} />
        <Text>Green</Text>
      </HStack>
      <HStack spacing={10}>
        <Color color="#FF9500" style={{ width: '100px', height: '50px' }} />
        <Text>Orange</Text>
      </HStack>
      <HStack spacing={10}>
        <Color color="#FF3B30" style={{ width: '100px', height: '50px' }} />
        <Text>Red</Text>
      </HStack>
    </VStack>
  ),
}


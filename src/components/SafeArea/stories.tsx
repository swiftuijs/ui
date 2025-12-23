import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text } from '../'
import { SafeArea, type ISafeAreaProps } from '.'

const meta: Meta<typeof SafeArea> = {
  title: 'SwiftUI/SafeArea',
  component: SafeArea,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that insets its content to respect safe area boundaries.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ISafeAreaProps>

export const Default: Story = {
  args: {
    children: (
      <VStack spacing={20} style={{ padding: '20px' }}>
        <Text>This content respects safe areas</Text>
        <Text>Top, bottom, left, and right safe areas are applied</Text>
      </VStack>
    ),
  },
}

export const TopOnly: Story = {
  args: {
    edges: ['top'],
    children: (
      <VStack spacing={20} style={{ padding: '20px' }}>
        <Text>Only top safe area is applied</Text>
      </VStack>
    ),
  },
}


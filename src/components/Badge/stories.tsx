import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../'
import { Badge, type IBadgeProps } from '.'

const meta: Meta<typeof Badge> = {
  title: 'SwiftUI/Badge',
  component: Badge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that displays a badge.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IBadgeProps>

export const Default: Story = {
  args: {
    children: '5',
  },
}

export const Styles: Story = {
  render: () => (
    <VStack spacing={10}>
      <HStack spacing={10}>
        <Text>Default:</Text>
        <Badge>5</Badge>
      </HStack>
      <HStack spacing={10}>
        <Text>Primary:</Text>
        <Badge variant="primary">12</Badge>
      </HStack>
      <HStack spacing={10}>
        <Text>Success:</Text>
        <Badge variant="success">New</Badge>
      </HStack>
      <HStack spacing={10}>
        <Text>Warning:</Text>
        <Badge variant="warning">!</Badge>
      </HStack>
      <HStack spacing={10}>
        <Text>Error:</Text>
        <Badge variant="error">99+</Badge>
      </HStack>
    </VStack>
  ),
}


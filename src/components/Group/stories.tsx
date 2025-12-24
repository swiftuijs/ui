import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, Text, Button } from '../'
import { Group, type IGroupProps } from '.'

const meta: Meta<typeof Group> = {
  title: 'SwiftUI/Group',
  component: Group,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A container for grouping view content.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IGroupProps>

export const Default: Story = {
  args: {
    children: (
      <>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </>
    )
  }
}

export const WithModifiers: Story = {
  render: () => (
    <VStack spacing={15}>
      <Group style={{ opacity: 0.8 }}>
        <Text>Grouped with opacity</Text>
        <Text>Both items share the same opacity</Text>
      </Group>
      <Group style={{ transform: 'scale(0.95)' }}>
        <Text>Grouped with scale</Text>
        <Text>Both items share the same transform</Text>
      </Group>
    </VStack>
  )
}

export const ConditionalRendering: Story = {
  render: () => {
    const showGroup = true
    return (
      <VStack spacing={10}>
        {showGroup && (
          <Group>
            <Text>Item 1</Text>
            <Text>Item 2</Text>
            <Text>Item 3</Text>
          </Group>
        )}
        <Text>Outside group</Text>
      </VStack>
    )
  }
}

export const NestedGroups: Story = {
  render: () => (
    <VStack spacing={10}>
      <Group>
        <Text>Outer Group Item 1</Text>
        <Group>
          <Text>Inner Group Item 1</Text>
          <Text>Inner Group Item 2</Text>
        </Group>
        <Text>Outer Group Item 2</Text>
      </Group>
    </VStack>
  )
}

export const WithButtons: Story = {
  render: () => (
    <Group>
      <Button>Button 1</Button>
      <Button>Button 2</Button>
      <Button>Button 3</Button>
    </Group>
  )
}


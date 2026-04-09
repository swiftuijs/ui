import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text, Button } from '../'
import { Divider, IDividerProps } from '.'

const meta: Meta<typeof Divider> = {
  title: 'SwiftUI/Divider',
  component: Divider,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A visual element that can be used to separate other content.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IDividerProps>

export const Default: Story = {
  render: () => (
    <VStack spacing={10}>
      <Text>Above</Text>
      <Divider />
      <Text>Below</Text>
    </VStack>
  )
}

export const InHStack: Story = {
  render: () => (
    <HStack spacing={10}>
      <Text>Left</Text>
      <Divider />
      <Text>Right</Text>
    </HStack>
  )
}

export const InVStack: Story = {
  render: () => (
    <VStack spacing={10}>
      <Text>First</Text>
      <Divider />
      <Text>Second</Text>
      <Divider />
      <Text>Third</Text>
    </VStack>
  )
}

export const MultipleDividers: Story = {
  render: () => (
    <VStack spacing={10}>
      <Text>Section 1</Text>
      <Divider />
      <Text>Section 2</Text>
      <Divider />
      <Text>Section 3</Text>
      <Divider />
      <Text>Section 4</Text>
    </VStack>
  )
}

export const WithButtons: Story = {
  render: () => (
    <VStack spacing={10}>
      <Button>First Action</Button>
      <Divider />
      <Button>Second Action</Button>
      <Divider />
      <Button>Third Action</Button>
    </VStack>
  )
}

export const CustomStyle: Story = {
  render: () => (
    <VStack spacing={10}>
      <Text>Above</Text>
      <Divider style={{ borderWidth: '2px', borderColor: '#007AFF' }} />
      <Text>Below</Text>
    </VStack>
  )
}

export const InList: Story = {
  render: () => (
    <VStack spacing={0}>
      <div style={{ padding: '15px' }}><Text>Item 1</Text></div>
      <Divider />
      <div style={{ padding: '15px' }}><Text>Item 2</Text></div>
      <Divider />
      <div style={{ padding: '15px' }}><Text>Item 3</Text></div>
    </VStack>
  )
}
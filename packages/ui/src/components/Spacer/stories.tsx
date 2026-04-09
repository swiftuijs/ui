import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text, Button } from '../'
import { Spacer, ISpacerProps } from '.'

const meta: Meta<typeof Spacer> = {
  title: 'SwiftUI/Spacer',
  component: Spacer,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A flexible space that expands along the major axis of its parent container.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ISpacerProps>

export const Default: Story = {
  render: () => (
    <HStack style={{ width: '100%' }}>
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </HStack>
  )
}

export const InHStack: Story = {
  render: () => (
    <HStack spacing={10} style={{ width: '100%' }}>
      <Button>Left</Button>
      <Spacer />
      <Button>Right</Button>
    </HStack>
  )
}

export const InVStack: Story = {
  render: () => (
    <VStack spacing={10} style={{ height: '200px' }}>
      <Text>Top</Text>
      <Spacer />
      <Text>Bottom</Text>
    </VStack>
  )
}

export const WithMinLength: Story = {
  args: {
    minLength: 50
  },
  render: () => (
    <HStack style={{ width: '100%' }}>
      <Text>Left</Text>
      <Spacer minLength={50} />
      <Text>Right</Text>
    </HStack>
  )
}

export const MultipleSpacers: Story = {
  render: () => (
    <HStack spacing={10} style={{ width: '100%' }}>
      <Text>Start</Text>
      <Spacer />
      <Text>Middle</Text>
      <Spacer />
      <Text>End</Text>
    </HStack>
  )
}

export const LeadingSpacer: Story = {
  render: () => (
    <HStack style={{ width: '100%' }}>
      <Spacer />
      <Text>Pushed to Right</Text>
    </HStack>
  )
}

export const TrailingSpacer: Story = {
  render: () => (
    <HStack style={{ width: '100%' }}>
      <Text>Pushed to Left</Text>
      <Spacer />
    </HStack>
  )
}

export const ComplexLayout: Story = {
  render: () => (
    <VStack spacing={10} style={{ height: '300px', width: '100%' }}>
      <Text>Header</Text>
      <Spacer />
      <HStack spacing={10} style={{ width: '100%' }}>
        <Button>Cancel</Button>
        <Spacer />
        <Button>Confirm</Button>
      </HStack>
    </VStack>
  )
}
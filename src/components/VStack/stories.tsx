import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, Spacer, Button } from '../'
import { VStack, IVStackProps } from '.'

const meta: Meta<typeof VStack> = {
  title: 'SwiftUI/VStack',
  component: VStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that arranges its children in a vertical line.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IVStackProps>

export const Default: Story = {
  args: {
    children: (
      <>
        <Text>First</Text>
        <Text>Second</Text>
        <Text>Third</Text>
      </>
    )
  }
}

export const WithSpacing: Story = {
  args: {
    spacing: 20,
    children: (
      <>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
        <Text>Item 3</Text>
      </>
    )
  }
}

export const WithAlignment: Story = {
  args: {
    alignment: 'leading',
    spacing: 10,
    children: (
      <>
        <Text>Left aligned</Text>
        <Text>Left aligned</Text>
      </>
    )
  }
}

export const WithSpacer: Story = {
  render: () => (
    <VStack spacing={10} style={{ height: '200px' }}>
      <Text>Top</Text>
      <Spacer />
      <Text>Bottom</Text>
    </VStack>
  )
}

export const WithButtons: Story = {
  render: () => (
    <VStack spacing={10}>
      <Button>First Button</Button>
      <Button>Second Button</Button>
      <Button>Third Button</Button>
    </VStack>
  )
}

export const CenterAligned: Story = {
  args: {
    alignment: 'center',
    spacing: 15,
    children: (
      <>
        <Text>Center</Text>
        <Text>Aligned</Text>
      </>
    )
  }
}

export const TrailingAligned: Story = {
  args: {
    alignment: 'trailing',
    spacing: 10,
    children: (
      <>
        <Text>Right</Text>
        <Text>Aligned</Text>
      </>
    )
  }
}

export const ComplexLayout: Story = {
  render: () => (
    <VStack spacing={20} alignment="leading">
      <Text style={{ fontSize: '24px', fontWeight: 'bold' }}>Title</Text>
      <Text>Subtitle text goes here</Text>
      <Spacer minLength={20} />
      <Button>Action Button</Button>
    </VStack>
  )
}
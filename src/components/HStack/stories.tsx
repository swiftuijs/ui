import type { Meta, StoryObj } from '@storybook/react-vite'
import { Text, Spacer, Button } from '../'
import { HStack, IHStackProps } from '.'

const meta: Meta<typeof HStack> = {
  title: 'SwiftUI/HStack',
  component: HStack,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that arranges its children in a horizontal line.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IHStackProps>

export const Default: Story = {
  args: {
    children: (
      <>
        <Text>Left</Text>
        <Text>Center</Text>
        <Text>Right</Text>
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

export const WithSpacer: Story = {
  render: () => (
    <HStack spacing={10}>
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </HStack>
  )
}

export const LeadingAlignment: Story = {
  args: {
    alignment: 'leading',
    spacing: 10,
    children: (
      <>
        <Text>Left</Text>
        <Text>Aligned</Text>
      </>
    )
  }
}

export const CenterAlignment: Story = {
  args: {
    alignment: 'center',
    spacing: 10,
    children: (
      <>
        <Text>Center</Text>
        <Text>Aligned</Text>
      </>
    )
  }
}

export const TrailingAlignment: Story = {
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

export const WithButtons: Story = {
  render: () => (
    <HStack spacing={10}>
      <Button>Cancel</Button>
      <Spacer />
      <Button>Confirm</Button>
    </HStack>
  )
}

export const ComplexLayout: Story = {
  render: () => (
    <HStack spacing={15} alignment="center">
      <Text style={{ fontSize: '18px', fontWeight: 'bold' }}>Title</Text>
      <Spacer />
      <Button>Action</Button>
    </HStack>
  )
}
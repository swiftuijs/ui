import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../'
import { Button, type IButtonProps } from '.'

const meta: Meta<typeof Button> = {
  title: 'SwiftUI/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A control that performs an action when triggered.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IButtonProps>

export const Default: Story = {
  args: {
    children: 'Button'
  }
}

export const WithText: Story = {
  args: {
    children: 'Click Me'
  }
}

export const WithCustomStyle: Story = {
  args: {
    children: 'Styled Button',
    style: {
      backgroundColor: '#007AFF',
      color: 'white',
      border: 'none'
    }
  }
}

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true
  }
}

export const Interactive: Story = {
  args: {
    children: 'Click Me',
    onClick: () => {
      console.log('Button clicked!')
    }
  }
}

export const InHStack: Story = {
  render: () => (
    <HStack spacing={10}>
      <Text>Left</Text>
      <Button>Center</Button>
      <Text>Right</Text>
    </HStack>
  )
}

export const InVStack: Story = {
  render: () => (
    <VStack spacing={10}>
      <Button>First</Button>
      <Button>Second</Button>
      <Button>Third</Button>
    </VStack>
  )
}

export const MultipleButtons: Story = {
  render: () => (
    <VStack spacing={10}>
      <Button>Primary Action</Button>
      <Button style={{ backgroundColor: 'transparent', border: '1px solid #007AFF' }}>
        Secondary Action
      </Button>
      <Button disabled>Disabled Action</Button>
    </VStack>
  )
}

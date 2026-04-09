import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button, Text } from '../'
import { Toolbar, type IToolbarProps } from '.'

const meta: Meta<typeof Toolbar> = {
  title: 'SwiftUI/Toolbar',
  component: Toolbar,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that displays toolbar items.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IToolbarProps>

export const Default: Story = {
  args: {
    items: [
      { content: <Button>Cancel</Button>, placement: 'cancellationAction' },
      { content: <Text style={{ fontWeight: 'bold' }}>Title</Text>, placement: 'principal' },
      { content: <Button>Done</Button>, placement: 'confirmationAction' },
    ],
  },
}

export const WithDestructive: Story = {
  args: {
    items: [
      { content: <Button>Cancel</Button>, placement: 'cancellationAction' },
      { content: <Text style={{ fontWeight: 'bold' }}>Edit</Text>, placement: 'principal' },
      { content: <Button>Delete</Button>, placement: 'destructiveAction' },
    ],
  },
}


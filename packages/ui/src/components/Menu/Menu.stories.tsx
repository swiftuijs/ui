import type { Meta, StoryObj } from '@storybook/react-vite'
import { Button } from '../'
import { Menu, type IMenuProps } from '.'

const meta: Meta<typeof Menu> = {
  title: 'SwiftUI/Menu',
  component: Menu,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that displays a menu of options.'
      }
    }
  }
}

export default meta

type Story = StoryObj<IMenuProps>

export const Default: Story = {
  args: {
    trigger: <Button>Options</Button>,
    items: [
      { label: 'Edit', action: () => alert('Edit clicked') },
      { label: 'Delete', action: () => alert('Delete clicked') },
      { label: 'Share', action: () => alert('Share clicked') },
    ],
  },
}

export const WithIcons: Story = {
  args: {
    trigger: <Button>Menu</Button>,
    items: [
      { label: 'Edit', icon: '✏️', action: () => alert('Edit') },
      { label: 'Delete', icon: '🗑️', action: () => alert('Delete') },
      { label: 'Share', icon: '📤', action: () => alert('Share') },
    ],
  },
}

export const WithDisabled: Story = {
  args: {
    trigger: <Button>Menu</Button>,
    items: [
      { label: 'Enabled Item', action: () => alert('Enabled') },
      { label: 'Disabled Item', disabled: true },
      { label: 'Another Enabled', action: () => alert('Another') },
    ],
  },
}

export const TopPlacement: Story = {
  args: {
    trigger: <Button>Menu (Top)</Button>,
    placement: 'top',
    items: [
      { label: 'Item 1', action: () => alert('Item 1') },
      { label: 'Item 2', action: () => alert('Item 2') },
    ],
  },
}


import type { Meta, StoryObj } from '@storybook/react-vite'

import { SwipeActions, type ISwipeActionsProps } from './index'

const meta: Meta<typeof SwipeActions> = {
  title: 'SwiftUI/SwipeActions',
  component: SwipeActions,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ISwipeActionsProps>

export const Default: Story = {
  render: () => (
    <SwipeActions
      actions={[
        { label: 'Flag' },
        { label: 'Archive' },
      ]}
    >
      <div style={{ padding: 16, border: '1px solid var(--sw-color-gray-4, #d1d5db)', borderRadius: 14 }}>
        Project update
      </div>
    </SwipeActions>
  ),
}

export const Leading: Story = {
  render: () => (
    <SwipeActions
      actions={[
        { label: 'Pin' },
        { label: 'Mark unread' },
      ]}
      edge="leading"
      defaultOpen
    >
      <div style={{ padding: 16, border: '1px solid var(--sw-color-gray-4, #d1d5db)', borderRadius: 14 }}>
        Conversation row
      </div>
    </SwipeActions>
  ),
}

export const Destructive: Story = {
  render: () => (
    <SwipeActions
      actions={[
        { label: 'Delete', tint: 'destructive' },
      ]}
      defaultOpen
    >
      <div style={{ padding: 16, border: '1px solid var(--sw-color-gray-4, #d1d5db)', borderRadius: 14 }}>
        Draft message
      </div>
    </SwipeActions>
  ),
}

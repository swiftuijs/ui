import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '../Card'
import { Text } from '../Text'

import { ContextMenu, type IContextMenuProps } from '.'

const meta: Meta<typeof ContextMenu> = {
  title: 'SwiftUI/ContextMenu',
  component: ContextMenu,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IContextMenuProps>

export const Default: Story = {
  render: () => (
    <ContextMenu
      items={[
        { label: 'Rename' },
        { label: 'Duplicate' },
        { label: 'Delete', style: 'destructive' },
      ]}
    >
      <Card>
        <Text>Right click this card</Text>
      </Card>
    </ContextMenu>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { Text } from '../Text'

import { ContentUnavailableView, type IContentUnavailableViewProps } from '.'

const meta: Meta<typeof ContentUnavailableView> = {
  title: 'SwiftUI/ContentUnavailableView',
  component: ContentUnavailableView,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IContentUnavailableViewProps>

export const Default: Story = {
  render: () => (
    <ContentUnavailableView
      icon={<Text style={{ fontSize: '2rem' }}>☆</Text>}
      title="No favorites yet"
      description="Items you save will appear here."
      actions={<Button>Add item</Button>}
    />
  ),
}

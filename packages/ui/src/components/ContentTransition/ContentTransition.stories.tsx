import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'

import { ContentTransition, type IContentTransitionProps } from './index'

const meta: Meta<typeof ContentTransition> = {
  title: 'SwiftUI/ContentTransition',
  component: ContentTransition,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IContentTransitionProps>

export const Opacity: Story = {
  render: () => (
    <ContentTransition transition="opacity">
      <Text>Status updated</Text>
    </ContentTransition>
  ),
}

export const Scale: Story = {
  render: () => (
    <ContentTransition transition="scale">
      <Text>42 items</Text>
    </ContentTransition>
  ),
}

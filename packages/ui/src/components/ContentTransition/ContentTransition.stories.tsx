import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { Button } from '../Button'

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

export const ChangingContent: Story = {
  render: function ChangingContent() {
    const [count, setCount] = useState(0)
    return <div>
      <ContentTransition transition="scale"><Text>{count} items</Text></ContentTransition>
      <Button onClick={() => setCount(value => value + 1)}>Add item</Button>
    </div>
  },
}

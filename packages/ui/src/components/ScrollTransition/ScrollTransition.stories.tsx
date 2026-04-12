import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { ScrollTransition, type IScrollTransitionProps } from './index'

const meta: Meta<typeof ScrollTransition> = {
  title: 'SwiftUI/ScrollTransition',
  component: ScrollTransition,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IScrollTransitionProps>

export const Opacity: Story = {
  render: () => (
    <VStack spacing={12}>
      <ScrollTransition transition="opacity" phase="topLeading">
        <Text>Upcoming headline</Text>
      </ScrollTransition>
      <ScrollTransition transition="identity" phase="identity">
        <Text>Current headline</Text>
      </ScrollTransition>
    </VStack>
  ),
}

export const Scale: Story = {
  render: () => (
    <ScrollTransition transition="scale" phase="bottomTrailing">
      <Text>Compact card</Text>
    </ScrollTransition>
  ),
}

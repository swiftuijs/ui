import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { ScrollBounceBehavior, type IScrollBounceBehaviorProps } from './index'

const meta: Meta<typeof ScrollBounceBehavior> = {
  title: 'SwiftUI/ScrollBounceBehavior',
  component: ScrollBounceBehavior,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IScrollBounceBehaviorProps>

export const Automatic: Story = {
  render: () => (
    <ScrollBounceBehavior>
      <Text>Use adaptive bounce behavior</Text>
    </ScrollBounceBehavior>
  ),
}

export const Behaviors: Story = {
  render: () => (
    <VStack spacing={12}>
      <ScrollBounceBehavior behavior="always">
        <Text>Always bounce vertically</Text>
      </ScrollBounceBehavior>
      <ScrollBounceBehavior behavior="basedOnSize" axes="all">
        <Text>Only bounce when content exceeds bounds</Text>
      </ScrollBounceBehavior>
    </VStack>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { DefaultScrollAnchor, type IDefaultScrollAnchorProps } from './index'

const meta: Meta<typeof DefaultScrollAnchor> = {
  title: 'SwiftUI/DefaultScrollAnchor',
  component: DefaultScrollAnchor,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IDefaultScrollAnchorProps>

export const Top: Story = {
  render: () => (
    <DefaultScrollAnchor anchor="top">
      <Text>Start scrolled to the leading edge</Text>
    </DefaultScrollAnchor>
  ),
}

export const Variants: Story = {
  render: () => (
    <VStack spacing={12}>
      <DefaultScrollAnchor anchor="center">
        <Text>Center content on first presentation</Text>
      </DefaultScrollAnchor>
      <DefaultScrollAnchor anchor="bottom">
        <Text>Pin the latest content to the bottom</Text>
      </DefaultScrollAnchor>
    </VStack>
  ),
}

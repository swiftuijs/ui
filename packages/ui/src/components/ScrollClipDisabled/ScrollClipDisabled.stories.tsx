import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { ScrollClipDisabled, type IScrollClipDisabledProps } from './index'

const meta: Meta<typeof ScrollClipDisabled> = {
  title: 'SwiftUI/ScrollClipDisabled',
  component: ScrollClipDisabled,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IScrollClipDisabledProps>

export const Disabled: Story = {
  render: () => (
    <ScrollClipDisabled disabled>
      <Text>Allow content to bleed outside the clip edge</Text>
    </ScrollClipDisabled>
  ),
}

export const ToggleState: Story = {
  render: () => (
    <VStack spacing={12}>
      <ScrollClipDisabled disabled>
        <Text>Clip disabled for carousel chrome</Text>
      </ScrollClipDisabled>
      <ScrollClipDisabled disabled={false}>
        <Text>Clip remains enabled</Text>
      </ScrollClipDisabled>
    </VStack>
  ),
}

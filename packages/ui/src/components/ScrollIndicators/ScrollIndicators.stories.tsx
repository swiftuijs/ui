import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { ScrollIndicators, type IScrollIndicatorsProps } from './index'

const meta: Meta<typeof ScrollIndicators> = {
  title: 'SwiftUI/ScrollIndicators',
  component: ScrollIndicators,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IScrollIndicatorsProps>

export const Automatic: Story = {
  render: () => (
    <ScrollIndicators>
      <Text>Use platform-default indicators</Text>
    </ScrollIndicators>
  ),
}

export const VisibilityStates: Story = {
  render: () => (
    <VStack spacing={12}>
      <ScrollIndicators visibility="visible" axes="vertical">
        <Text>Always show vertical indicators</Text>
      </ScrollIndicators>
      <ScrollIndicators visibility="hidden" axes="horizontal">
        <Text>Hide horizontal indicators</Text>
      </ScrollIndicators>
    </VStack>
  ),
}

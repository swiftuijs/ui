import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { PresentationDragIndicator, type IPresentationDragIndicatorProps } from './index'

const meta: Meta<typeof PresentationDragIndicator> = {
  title: 'SwiftUI/PresentationDragIndicator',
  component: PresentationDragIndicator,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IPresentationDragIndicatorProps>

export const Automatic: Story = {
  render: () => (
    <PresentationDragIndicator>
      <Text>Use platform default drag indicator</Text>
    </PresentationDragIndicator>
  ),
}

export const VisibilityStates: Story = {
  render: () => (
    <VStack spacing={12}>
      <PresentationDragIndicator visibility="visible">
        <Text>Always show drag affordance</Text>
      </PresentationDragIndicator>
      <PresentationDragIndicator visibility="hidden">
        <Text>Hide drag affordance</Text>
      </PresentationDragIndicator>
    </VStack>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import {
  PresentationCompactAdaptation,
  type IPresentationCompactAdaptationProps,
} from './index'

const meta: Meta<typeof PresentationCompactAdaptation> = {
  title: 'SwiftUI/PresentationCompactAdaptation',
  component: PresentationCompactAdaptation,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IPresentationCompactAdaptationProps>

export const Automatic: Story = {
  render: () => (
    <PresentationCompactAdaptation>
      <Text>Adaptive presentation fallback</Text>
    </PresentationCompactAdaptation>
  ),
}

export const Variants: Story = {
  render: () => (
    <VStack spacing={12}>
      <PresentationCompactAdaptation adaptation="popover">
        <Text>Prefer popover in compact size</Text>
      </PresentationCompactAdaptation>
      <PresentationCompactAdaptation adaptation="sheet">
        <Text>Prefer sheet in compact size</Text>
      </PresentationCompactAdaptation>
      <PresentationCompactAdaptation adaptation="fullScreenCover">
        <Text>Escalate to full-screen cover</Text>
      </PresentationCompactAdaptation>
    </VStack>
  ),
}

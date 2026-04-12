import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { PresentationCornerRadius, type IPresentationCornerRadiusProps } from './index'

const meta: Meta<typeof PresentationCornerRadius> = {
  title: 'SwiftUI/PresentationCornerRadius',
  component: PresentationCornerRadius,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IPresentationCornerRadiusProps>

export const Default: Story = {
  render: () => (
    <PresentationCornerRadius radius={28} style={{ border: '1px solid var(--sw-color-border)', padding: 16 }}>
      <Text>Rounded presentation surface</Text>
    </PresentationCornerRadius>
  ),
}

export const RadiusVariants: Story = {
  render: () => (
    <VStack spacing={12}>
      <PresentationCornerRadius radius={16} style={{ border: '1px solid var(--sw-color-border)', padding: 16 }}>
        <Text>Compact card radius</Text>
      </PresentationCornerRadius>
      <PresentationCornerRadius radius={36} style={{ border: '1px solid var(--sw-color-border)', padding: 16 }}>
        <Text>Large modal radius</Text>
      </PresentationCornerRadius>
      <PresentationCornerRadius radius="999px" style={{ border: '1px solid var(--sw-color-border)', padding: 16 }}>
        <Text>Capsule presentation chrome</Text>
      </PresentationCornerRadius>
    </VStack>
  ),
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { VisualEffect, type IVisualEffectProps } from './index'

const meta: Meta<typeof VisualEffect> = {
  title: 'SwiftUI/VisualEffect',
  component: VisualEffect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IVisualEffectProps>

export const Subtle: Story = {
  render: () => (
    <VisualEffect effect="subtle">
      <Text style={{ padding: '12px 16px' }}>Secondary surface</Text>
    </VisualEffect>
  ),
}

export const Prominent: Story = {
  render: () => (
    <VStack spacing={12}>
      <VisualEffect effect="prominent" shape="rounded">
        <Text style={{ padding: '14px 18px' }}>Inspector summary</Text>
      </VisualEffect>
      <VisualEffect effect="prominent" shape="capsule">
        <Text style={{ padding: '10px 16px' }}>Toolbar chip</Text>
      </VisualEffect>
    </VStack>
  ),
}

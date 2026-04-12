import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'

import { HoverEffect, type IHoverEffectProps } from './index'

const meta: Meta<typeof HoverEffect> = {
  title: 'SwiftUI/HoverEffect',
  component: HoverEffect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IHoverEffectProps>

export const Highlight: Story = {
  render: () => (
    <HoverEffect effect="highlight">
      <Button>Hover me</Button>
    </HoverEffect>
  ),
}

export const Lift: Story = {
  render: () => (
    <HoverEffect effect="lift">
      <Button>Pointer lift</Button>
    </HoverEffect>
  ),
}

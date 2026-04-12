import type { Meta, StoryObj } from '@storybook/react-vite'

import { SymbolEffect, type ISymbolEffectProps } from './index'

const meta: Meta<typeof SymbolEffect> = {
  title: 'SwiftUI/SymbolEffect',
  component: SymbolEffect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ISymbolEffectProps>

export const Pulse: Story = {
  args: {
    effect: 'pulse',
    children: <span style={{ fontSize: 32 }}>★</span>,
  },
}

export const Bounce: Story = {
  args: {
    effect: 'bounce',
    children: <span style={{ fontSize: 32 }}>🔔</span>,
  },
}

export const Appear: Story = {
  args: {
    effect: 'appear',
    children: <span style={{ fontSize: 32 }}>♥</span>,
  },
}

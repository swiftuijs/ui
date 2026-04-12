import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'

import { SafeAreaInset, type ISafeAreaInsetProps } from './index'

const meta: Meta<typeof SafeAreaInset> = {
  title: 'SwiftUI/SafeAreaInset',
  component: SafeAreaInset,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ISafeAreaInsetProps>

export const Bottom: Story = {
  render: () => (
    <SafeAreaInset edge="bottom" inset={<Button>Compose</Button>}>
      <div style={{ padding: 16, border: '1px solid var(--sw-color-gray-4, #d1d5db)', borderRadius: 16 }}>
        Mail list
      </div>
    </SafeAreaInset>
  ),
}

export const Top: Story = {
  render: () => (
    <SafeAreaInset edge="top" inset={<div style={{ padding: 12 }}>Now playing</div>}>
      <div style={{ padding: 16, border: '1px solid var(--sw-color-gray-4, #d1d5db)', borderRadius: 16 }}>
        Library content
      </div>
    </SafeAreaInset>
  ),
}

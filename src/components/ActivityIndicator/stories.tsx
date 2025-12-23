import type { Meta, StoryObj } from '@storybook/react'
import { ActivityIndicator } from './index'
import { VStack } from '../VStack'
import { HStack } from '../HStack'

const meta: Meta<typeof ActivityIndicator> = {
  title: 'Components/ActivityIndicator',
  component: ActivityIndicator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ActivityIndicator>

export const Default: Story = {
  render: () => (
    <VStack spacing={24}>
      <HStack spacing={16}>
        <ActivityIndicator size="small" />
        <ActivityIndicator size="medium" />
        <ActivityIndicator size="large" />
      </HStack>
      <ActivityIndicator color="#FF3B30" />
      <ActivityIndicator color="#34C759" />
    </VStack>
  ),
}


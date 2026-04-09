import type { Meta, StoryObj } from '@storybook/react'
import { SecureField } from './index'
import { VStack } from '../VStack'

const meta: Meta<typeof SecureField> = {
  title: 'SwiftUI/SecureField',
  component: SecureField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof SecureField>

export const Default: Story = {
  render: () => (
    <VStack spacing={16}>
      <SecureField placeholder="Enter password" />
      <SecureField placeholder="Disabled field" disabled />
    </VStack>
  ),
}


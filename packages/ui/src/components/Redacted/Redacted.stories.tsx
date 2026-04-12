import type { Meta, StoryObj } from '@storybook/react-vite'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { Redacted, type IRedactedProps } from './index'

const meta: Meta<typeof Redacted> = {
  title: 'SwiftUI/Redacted',
  component: Redacted,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IRedactedProps>

export const Placeholder: Story = {
  render: () => (
    <VStack spacing={10}>
      <Redacted>
        <Text>Loading profile</Text>
      </Redacted>
      <Redacted>
        <Text>Recent activity</Text>
      </Redacted>
    </VStack>
  ),
}

export const Privacy: Story = {
  render: () => (
    <Redacted reason="privacy">
      <Text>Account balance</Text>
    </Redacted>
  ),
}

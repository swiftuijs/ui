import type { Meta, StoryObj } from '@storybook/react-vite'

import { Redacted } from '../Redacted'
import { Text } from '../Text'
import { VStack } from '../VStack'

import { Unredacted, type IUnredactedProps } from './index'

const meta: Meta<typeof Unredacted> = {
  title: 'SwiftUI/Unredacted',
  component: Unredacted,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IUnredactedProps>

export const Default: Story = {
  render: () => (
    <VStack spacing={10}>
      <Redacted>
        <Text>Loading profile</Text>
      </Redacted>
      <Redacted>
        <Unredacted>
          <Text>Visible badge</Text>
        </Unredacted>
      </Redacted>
    </VStack>
  ),
}

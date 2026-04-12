import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card, Text, TextSelection, VStack, type ITextSelectionProps } from '@/components'

const meta: Meta<typeof TextSelection> = {
  title: 'SwiftUI/TextSelection',
  component: TextSelection,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<ITextSelectionProps>

export const Enabled: Story = {
  render: () => (
    <TextSelection>
      <Card>
        <Text>Copy this diagnostic string from the docs preview.</Text>
      </Card>
    </TextSelection>
  ),
}

export const Disabled: Story = {
  render: () => (
    <VStack spacing={12}>
      <TextSelection selection="disabled">
        <Card>
          <Text>Static summary content</Text>
        </Card>
      </TextSelection>
    </VStack>
  ),
}

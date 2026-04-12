import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { Text } from '../Text'
import { VStack } from '../VStack'

import { PasteButton, type IPasteButtonProps } from '.'

const meta: Meta<typeof PasteButton> = {
  title: 'SwiftUI/PasteButton',
  component: PasteButton,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IPasteButtonProps>

function DemoPasteButton() {
  const [value, setValue] = useState('Nothing pasted yet')

  return (
    <VStack spacing={12}>
      <PasteButton onPaste={(text) => setValue(text)}>Paste text</PasteButton>
      <Text>{value}</Text>
    </VStack>
  )
}

export const Default: Story = {
  render: () => <DemoPasteButton />,
}

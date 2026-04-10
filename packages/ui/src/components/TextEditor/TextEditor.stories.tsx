import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'
import { VStack, Text } from '../'
import { TextEditor, type ITextEditorProps } from '.'

const meta: Meta<typeof TextEditor> = {
  title: 'SwiftUI/TextEditor',
  component: TextEditor,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A native textarea-backed multiline editor with SwiftUI-style value callbacks.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ITextEditorProps>

function ControlledTextEditor() {
  const [value, setValue] = useState('Draft message')

  return (
    <VStack spacing={10}>
      <Text>Character count: {value.length}</Text>
      <TextEditor
        aria-label="Controlled message"
        value={value}
        onValueChange={setValue}
        placeholder="Write a response..."
      />
    </VStack>
  )
}

export const Default: Story = {
  args: {
    'aria-label': 'Notes',
    defaultValue: 'Start with a draft here...',
    placeholder: 'Enter notes...',
  },
}

export const Controlled: Story = {
  render: () => <ControlledTextEditor />,
}

export const Rows: Story = {
  args: {
    'aria-label': 'Release notes',
    defaultValue: 'Line 1\nLine 2\nLine 3\nLine 4',
    placeholder: 'Enter release notes...',
  },
}

export const ReadOnly: Story = {
  args: {
    'aria-label': 'Locked note',
    defaultValue: 'You can copy this text, but not edit it.',
    readOnly: true,
  },
}

export const Disabled: Story = {
  args: {
    'aria-label': 'Disabled note',
    defaultValue: 'This editor is disabled.',
    disabled: true,
  },
}

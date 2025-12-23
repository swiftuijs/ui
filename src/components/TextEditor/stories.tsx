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
        component: 'A view that displays and edits multiline text.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ITextEditorProps>

function DefaultTextEditor() {
  const [value, setValue] = useState('')

  return (
    <VStack spacing={10}>
      <Text>Character count: {value.length}</Text>
      <TextEditor
        value={value}
        onChange={setValue}
        placeholder="Enter text..."
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <DefaultTextEditor />,
}

export const WithMinMaxLines: Story = {
  args: {
    value: 'Line 1\nLine 2\nLine 3',
    minLines: 3,
    maxLines: 5,
    placeholder: 'Enter 3-5 lines...',
  },
}

export const Disabled: Story = {
  args: {
    value: 'This is disabled',
    disabled: true,
  },
}


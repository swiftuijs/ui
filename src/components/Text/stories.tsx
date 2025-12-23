import type { Meta, StoryObj } from '@storybook/react-vite'
import { VStack, HStack } from '../'
import { Text, type ITextProps } from '.'

const meta: Meta<typeof Text> = {
  title: 'SwiftUI/Text',
  component: Text,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'A view that displays one or more lines of read-only text.'
      }
    }
  }
}

export default meta

type Story = StoryObj<ITextProps>

export const Default: Story = {
  args: {
    children: 'Hello, World!'
  }
}

export const LongText: Story = {
  args: {
    children: 'This is a longer text that demonstrates how the Text component handles multiple lines of content. It will wrap naturally based on the container width.'
  }
}

export const WithLineLimit: Story = {
  args: {
    children: 'This is a very long text that will be truncated after the specified number of lines. The lineLimit prop controls how many lines are shown before truncation occurs.',
    lineLimit: 2
  }
}

export const SingleLineLimit: Story = {
  args: {
    children: 'This text will be truncated to a single line with an ellipsis if it exceeds the container width.',
    lineLimit: 1
  }
}

export const MultipleTexts: Story = {
  render: () => (
    <VStack spacing={10}>
      <Text>First line</Text>
      <Text>Second line</Text>
      <Text>Third line</Text>
    </VStack>
  )
}

export const TextInHStack: Story = {
  render: () => (
    <HStack spacing={10}>
      <Text>Left</Text>
      <Text>Center</Text>
      <Text>Right</Text>
    </HStack>
  )
}

export const CustomStyle: Story = {
  args: {
    children: 'Text with custom style',
    style: {
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#007AFF'
    }
  }
}


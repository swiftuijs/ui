import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { TextField } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof TextField> = {
  title: 'SwiftUI/TextField',
  component: TextField,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof TextField>

export const Default: Story = {
  render: () => (
    <VStack spacing={16}>
      <TextField placeholder="Enter text here" />
      <TextField placeholder="Disabled field" disabled />
      <TextField placeholder="Email" type="email" />
    </VStack>
  ),
}

const TextFieldWithValueDemo = () => {
  const [value, setValue] = useState('Hello World')
  return (
    <VStack spacing={16}>
      <Text>Current value: {value}</Text>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type something..."
      />
    </VStack>
  )
}

export const WithValue: Story = {
  render: () => <TextFieldWithValueDemo />,
}


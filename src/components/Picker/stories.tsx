import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Picker } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof Picker> = {
  title: 'Components/Picker',
  component: Picker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Picker>

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
]

const PickerDemo = () => {
  const [selected, setSelected] = useState<string | number>()
  return (
    <VStack spacing={16}>
      <Text>Selected: {selected || 'None'}</Text>
      <Picker
        selectedValue={selected}
        onValueChange={setSelected}
        options={options}
        placeholder="Choose an option"
      />
      <Picker
        selectedValue={selected}
        onValueChange={setSelected}
        options={options}
        disabled
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <PickerDemo />,
}


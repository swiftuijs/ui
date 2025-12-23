import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePicker>

const DatePickerDemo = () => {
  const [date, setDate] = useState<Date>()
  return (
    <VStack spacing={16}>
      <Text>Selected: {date ? date.toLocaleDateString() : 'None'}</Text>
      <DatePicker
        value={date}
        onValueChange={setDate}
        mode="date"
      />
      <DatePicker
        value={date}
        onValueChange={setDate}
        mode="time"
      />
      <DatePicker
        value={date}
        onValueChange={setDate}
        mode="datetime"
      />
      <DatePicker
        value={date}
        onValueChange={setDate}
        mode="date"
        disabled
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <DatePickerDemo />,
}


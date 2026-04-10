import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { DatePicker } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof DatePicker> = {
  title: 'SwiftUI/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof DatePicker>

const ControlledDateDemo = () => {
  const [date, setDate] = useState('2026-04-10')
  return (
    <VStack spacing={16}>
      <Text>Selected: {date}</Text>
      <DatePicker
        aria-label="Controlled date"
        value={date}
        onValueChange={setDate}
        mode="date"
      />
    </VStack>
  )
}

const UncontrolledTimeDemo = () => {
  return (
    <VStack spacing={16}>
      <DatePicker
        aria-label="Meeting time"
        defaultValue="09:30"
        mode="time"
      />
      <Text>Use the browser-native time picker input.</Text>
    </VStack>
  )
}

const DateAndTimeDemo = () => {
  const [value, setValue] = useState('2026-04-10T09:30')
  return (
    <VStack spacing={16}>
      <Text>Selected: {value}</Text>
      <DatePicker
        aria-label="Scheduled start"
        value={value}
        onValueChange={setValue}
        mode="dateAndTime"
      />
    </VStack>
  )
}

const DisplayedComponentsDemo = () => {
  const [value, setValue] = useState('2026-04-10T09:30')
  return (
    <VStack spacing={16}>
      <Text>Selected: {value}</Text>
      <DatePicker
        aria-label="SwiftUI-style schedule"
        value={value}
        onValueChange={setValue}
        displayedComponents={['date', 'hourAndMinute']}
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <ControlledDateDemo />,
}

export const Uncontrolled: Story = {
  render: () => <UncontrolledTimeDemo />,
}

export const DateAndTime: Story = {
  render: () => <DateAndTimeDemo />,
}

export const DisplayedComponents: Story = {
  render: () => <DisplayedComponentsDemo />,
}

export const Disabled: Story = {
  render: () => (
    <DatePicker
      aria-label="Disabled date"
      defaultValue="2026-04-10"
      disabled
      mode="date"
    />
  ),
}

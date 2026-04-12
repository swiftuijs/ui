import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'

import { Text } from '../Text'
import { VStack } from '../VStack'
import { MultiDatePicker } from './index'

const meta: Meta<typeof MultiDatePicker> = {
  title: 'SwiftUI/MultiDatePicker',
  component: MultiDatePicker,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof MultiDatePicker>

function ControlledDemo() {
  const [dates, setDates] = useState(['2026-04-10', '2026-04-12'])

  return (
    <VStack spacing={16}>
      <Text>Selected: {dates.join(', ')}</Text>
      <MultiDatePicker
        label="Travel dates"
        value={dates}
        onValueChange={setDates}
      />
    </VStack>
  )
}

function BoundedDemo() {
  const [dates, setDates] = useState(['2026-05-03'])

  return (
    <VStack spacing={16}>
      <Text>Selected: {dates.join(', ')}</Text>
      <MultiDatePicker
        label="Conference dates"
        minimumDate="2026-05-01"
        maximumDate="2026-05-31"
        value={dates}
        onValueChange={setDates}
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <ControlledDemo />,
}

export const Bounded: Story = {
  render: () => <BoundedDemo />,
}

export const Disabled: Story = {
  render: () => (
    <MultiDatePicker
      label="Unavailable dates"
      defaultValue={['2026-04-22', '2026-04-25']}
      disabled
    />
  ),
}

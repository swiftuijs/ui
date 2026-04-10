import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof Stepper> = {
  title: 'SwiftUI/Stepper',
  component: Stepper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stepper>

const ControlledDemo = () => {
  const [value, setValue] = useState(5)
  return (
    <VStack spacing={16}>
      <Text>Controlled value: {value}</Text>
      <Stepper
        value={value}
        onValueChange={setValue}
      />
    </VStack>
  )
}

const UncontrolledDemo = () => {
  const [value, setValue] = useState(2)
  return (
    <VStack spacing={16}>
      <Text>Observed value: {value}</Text>
      <Stepper
        defaultValue={2}
        onChange={setValue}
      />
    </VStack>
  )
}

const BoundedDemo = () => {
  const [value, setValue] = useState(1)
  return (
    <VStack spacing={16}>
      <Text>Bounded value: {value}</Text>
      <Stepper
        value={value}
        onValueChange={setValue}
        min={0}
        max={4}
        step={2}
      />
    </VStack>
  )
}

const DisabledDemo = () => {
  const [value, setValue] = useState(3)
  return (
    <VStack spacing={16}>
      <Text>Disabled value: {value}</Text>
      <Stepper
        defaultValue={3}
        onValueChange={setValue}
        disabled
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <ControlledDemo />,
}

export const Controlled: Story = {
  render: () => <ControlledDemo />,
}

export const Uncontrolled: Story = {
  render: () => <UncontrolledDemo />,
}

export const Bounded: Story = {
  render: () => <BoundedDemo />,
}

export const Disabled: Story = {
  render: () => <DisabledDemo />,
}

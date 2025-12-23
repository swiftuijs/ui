import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Stepper } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Stepper>

const StepperDemo = () => {
  const [value, setValue] = useState(5)
  return (
    <VStack spacing={16}>
      <Text>Value: {value}</Text>
      <Stepper
        value={value}
        onIncrement={() => setValue(value + 1)}
        onDecrement={() => setValue(value - 1)}
      />
      <Stepper
        value={value}
        onIncrement={() => setValue(value + 1)}
        onDecrement={() => setValue(value - 1)}
        min={0}
        max={10}
      />
      <Stepper
        value={value}
        onIncrement={() => setValue(value + 1)}
        onDecrement={() => setValue(value - 1)}
        disabled
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <StepperDemo />,
}


import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof Slider> = {
  title: 'SwiftUI/Slider',
  component: Slider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

const ControlledSliderDemo = () => {
  const [value, setValue] = useState(50)
  return (
    <VStack spacing={16}>
      <Text>Controlled value: {value}</Text>
      <Slider
        aria-label="Controlled slider"
        value={value}
        onValueChange={setValue}
        min={0}
        max={100}
      />
    </VStack>
  )
}

const UncontrolledSliderDemo = () => {
  return (
    <VStack spacing={16}>
      <Text>Uses browser-managed default value</Text>
      <Slider
        aria-label="Uncontrolled slider"
        defaultValue={35}
        min={0}
        max={100}
        step={5}
      />
    </VStack>
  )
}

const DisabledSliderDemo = () => {
  return (
    <VStack spacing={16}>
      <Text>Disabled slider</Text>
      <Slider
        aria-label="Disabled slider"
        defaultValue={65}
        min={0}
        max={100}
        disabled
      />
    </VStack>
  )
}

export const Default: Story = {
  render: () => <ControlledSliderDemo />,
}

export const Uncontrolled: Story = {
  render: () => <UncontrolledSliderDemo />,
}

export const Disabled: Story = {
  render: () => <DisabledSliderDemo />,
}

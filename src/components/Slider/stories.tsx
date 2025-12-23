import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Slider } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof Slider> = {
  title: 'Components/Slider',
  component: Slider,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(50)
    return (
      <VStack spacing={16}>
        <Text>Value: {value}</Text>
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
        />
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          step={5}
        />
        <Slider
          value={value}
          onValueChange={setValue}
          min={0}
          max={100}
          disabled
        />
      </VStack>
    )
  },
}


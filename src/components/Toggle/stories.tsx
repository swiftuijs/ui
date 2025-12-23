import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from './index'
import { VStack } from '../VStack'
import { Text } from '../Text'

const meta: Meta<typeof Toggle> = {
  title: 'Components/Toggle',
  component: Toggle,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: () => {
    const [isOn, setIsOn] = useState(false)
    return (
      <VStack spacing={16}>
        <Text>Toggle is {isOn ? 'on' : 'off'}</Text>
        <Toggle isOn={isOn} onChange={setIsOn} />
        <Toggle isOn={true} onChange={() => {}} />
        <Toggle isOn={false} onChange={() => {}} disabled />
      </VStack>
    )
  },
}


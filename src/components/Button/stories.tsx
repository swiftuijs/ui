import type { Meta, StoryObj } from '@storybook/react'
import { HStack, VStack, Text } from '../'
import { Button, type IButtonProps } from '.'

const meta: Meta<typeof Button> = {
  title: 'SwiftUI/Button',
  component: Button
}

export default meta

type Story = StoryObj<IButtonProps>

export const ButtonBetween: Story = {
  render: (args) => (
    <HStack>
      <Text>Left</Text>
      <Button {...args} />
      <Text>Right</Text>
    </HStack>
  )
}

export const ButtonWithVStackBetween: Story = {
  render: (args) => (
    <VStack>
      <Text>Left</Text>
      <Button {...args}>
        <Text>Right</Text>
      </Button>
      <Text>Right</Text>
    </VStack>
  )
}

export function ButtonLeading () {
  return (
    <HStack>
      <Button />
      <Text>Text</Text>
    </HStack>
  )
}

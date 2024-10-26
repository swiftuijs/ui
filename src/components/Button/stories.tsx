import type { Meta, StoryObj } from '@storybook/react'
import { useArgs } from '@storybook/preview-api'
import { HStack, VStack, Text } from '../'
import { Button, type IButtonProps } from '.'

const meta: Meta<typeof Button> = {
  title: 'SwiftUI/Button',
  component: Button
}

export default meta

type Story = StoryObj<IButtonProps>

export const ButtonBetween: Story = {
  render: function Render(_props) {
    const [args] = useArgs()
    return (
      <HStack>
        <Text>Left</Text>
        <Button {...args} />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export const ButtonWithVStackBetween: Story = {
  render: function Render (_props) {
    const [args] = useArgs()
    return (
      <VStack>
        <Text>Left</Text>
        <Button {...args}>
          <Text>Right</Text>
        </Button>
        <Text>Right</Text>
      </VStack>
    )
  }
}

export function ButtonLeading () {
  return (
    <HStack>
      <Button />
      <Text>Text</Text>
    </HStack>
  )
}

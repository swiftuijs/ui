import type { Meta, StoryObj } from '@storybook/react'
import { HStack, VStack, Text } from '../'
import { Divider, IDividerProps } from '.'

const meta: Meta<typeof Divider> = {
  title: 'SwiftUI/Divider',
  component: Divider
}

export default meta

type Story = StoryObj<IDividerProps>

export const DividerBetween: Story = {
  render() {
    return (
      <HStack>
        <Text>Left</Text>
        <Divider />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export function DividerWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <Divider />
      <Text>Right</Text>
    </VStack>
  )
}

export function DividerLeading () {
  return (
    <HStack>
      <Divider />
      <Text>Text</Text>
    </HStack>
  )
}
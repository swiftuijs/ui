import type { Meta, StoryObj } from '@storybook/react'
import { HStack, VStack, Text } from '../'
import { Spacer, ISpacerProps } from '.'

const meta: Meta<typeof Spacer> = {
  title: 'SwiftUI/Spacer',
  component: Spacer
}

export default meta

type Story = StoryObj<ISpacerProps>

export const SpacerBetween: Story = {
  render() {
    return (
      <HStack>
        <Text>Left</Text>
        <Spacer />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export function SpacerWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <Spacer minLength={20}/>
      <Text>Right</Text>
    </VStack>
  )
}

export function SpacerLeading () {
  return (
    <HStack>
      <Spacer />
      <Text>Text</Text>
    </HStack>
  )
}
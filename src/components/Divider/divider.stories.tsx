import type { Meta } from '@storybook/react'
import { HStack, VStack, Text, Divider } from '../'

export default {
  title: 'SwiftUI/Divider',
  component: Divider
} satisfies Meta

export function DividerBetween () {
  return (
    <HStack>
      <Text>Left</Text>
      <Divider />
      <Text>Right</Text>
    </HStack>
  )
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
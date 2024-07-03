import type { Meta } from '@storybook/react'
import { HStack, VStack, Text, Button } from '../'

export default {
  title: 'SwiftUI/Spacer',
  component: Button
} satisfies Meta

export function ButtonBetween () {
  return (
    <HStack>
      <Text>Left</Text>
      <Button />
      <Text>Right</Text>
    </HStack>
  )
}

export function ButtonWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <Button>
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

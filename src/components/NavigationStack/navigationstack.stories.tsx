import type { Meta } from '@storybook/react'
import { HStack, VStack, Text, NavigationStack } from '../'

export default {
  title: 'SwiftUI/Spacer',
  component: NavigationStack
} satisfies Meta

export function NavigationStackBetween () {
  return (
    <HStack>
      <Text>Left</Text>
      <NavigationStack />
      <Text>Right</Text>
    </HStack>
  )
}

export function NavigationStackWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <NavigationStack/>
      <Text>Right</Text>
    </VStack>
  )
}

export function NavigationStackLeading () {
  return (
    <HStack>
      <NavigationStack />
      <Text>Text</Text>
    </HStack>
  )
}

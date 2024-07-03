import type { Meta } from '@storybook/react'
import { HStack, VStack, Text, NavigationLink } from '../'

export default {
  title: 'SwiftUI/Spacer',
  component: NavigationLink
} satisfies Meta

export function NavigationLinkBetween () {
  return (
    <HStack>
      <Text>Left</Text>
      <NavigationLink />
      <Text>Right</Text>
    </HStack>
  )
}

export function NavigationLinkWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <NavigationLink>
        <Text>Right</Text>
      </NavigationLink>
      <Text>Right</Text>
    </VStack>
  )
}

export function NavigationLinkLeading () {
  return (
    <HStack>
      <NavigationLink />
      <Text>Text</Text>
    </HStack>
  )
}

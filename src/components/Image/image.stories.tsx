import type { Meta } from '@storybook/react'
import { HStack, VStack, Text, Image } from '../'

export default {
  title: 'SwiftUI/Spacer',
  component: Image
} satisfies Meta

export function ImageBetween () {
  return (
    <HStack>
      <Text>Left</Text>
      <Image />
      <Text>Right</Text>
    </HStack>
  )
}

export function ImageWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <Image />
      <Text>Right</Text>
    </VStack>
  )
}

export function ImageLeading () {
  return (
    <HStack>
      <Image />
      <Text>Text</Text>
    </HStack>
  )
}

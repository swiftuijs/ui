import React from 'react'
import type { Meta } from '@storybook/react'
import { HStack, VStack, Text, Spacer } from '../'

export default {
  title: 'SwiftUI/Spacer',
  component: Spacer
} satisfies Meta

export function SpacerBetween () {
  return (
    <HStack>
      <Text>Left</Text>
      <Spacer />
      <Text>Right</Text>
    </HStack>
  )
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
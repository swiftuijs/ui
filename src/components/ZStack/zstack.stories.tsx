import React from 'react'
import type { Meta } from '@storybook/react'
import { ZStack, VStack, Text } from '../'

export default {
  title: 'SwiftUI/ZStack',
  component: ZStack
} satisfies Meta

export function ZStackNormal () {
  return (
    <ZStack>
      <Text style={{color: 'lightblue'}}> Layer 1 in Background</Text>
      <VStack>
        <Text>Layer 2</Text>
      </VStack>
    </ZStack>
  )
}

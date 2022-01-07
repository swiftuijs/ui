import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ZStack, VStack, Text } from '../index'

export default {
  title: 'SwiftUI/ZStack',
  component: ZStack
} as Meta

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

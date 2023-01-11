import React from 'react'
import { Story, Meta } from '@storybook/react'
import { VStack, Text, Spacer } from '../'

export default {
  title: 'SwiftUI/VStack',
  component: VStack
} as Meta

export function VStackNormal () {
  return (
    <VStack>
      <Text>SSSS</Text>
      <Text>SSSS</Text>
    </VStack>
  )
}

export function VStackWithSpacer () {
  return (
    <VStack>
      <Spacer />
      <Text>SSSS</Text>
      <Text>SSSS</Text>
    </VStack>
  )
}
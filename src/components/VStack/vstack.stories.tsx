import React from 'react'
import type {  Meta } from '@storybook/react'
import { VStack, Text, Spacer } from '../'

export default {
  title: 'SwiftUI/VStack',
  component: VStack
} satisfies Meta

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
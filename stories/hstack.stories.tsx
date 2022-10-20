import React from 'react'
import { Story, Meta } from '@storybook/react'
import { HStack, Text, Spacer } from '../src'

export default {
  title: 'SwiftUI/HStack',
  component: HStack
} as Meta

export function HStackSpaceInMiddle () {
  return (
    <HStack>
      <Text>HHH</Text>
      <Spacer minLength="10"/>
      <Text>HHH</Text>
    </HStack>
  )
}

export function HStackInLeft () {
  return (
    <HStack>
      <Spacer />
      <Text>HHH</Text>
      <Text>HHH</Text>
    </HStack>
  )
}
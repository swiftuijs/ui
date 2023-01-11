import React from 'react'
import { ComponentMeta } from '@storybook/react'
import { HStack, Text, Spacer, IHStackProps } from '../'

export default {
  title: 'SwiftUI/HStack',
  component: HStack,
} as ComponentMeta<typeof HStack>

export function HStackSpaceInMiddle(props: IHStackProps) {
  return (
    <HStack {...props}>
      <Text>HHH</Text>
      <Spacer minLength="10"/>
      <Text>HHH</Text>
    </HStack>
  )
}

export function HStackInLeft() {
  return (
    <HStack >
      <Spacer />
      <Text>HHH</Text>
      <Text>HHH</Text>
    </HStack>
  )
}
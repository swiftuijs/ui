import React from 'react'
import { Story, Meta } from '@storybook/react'
import * as sw from '../index'

export default {
  title: 'Example/VStack',
  component: sw.VStack
} as Meta

export function VStack () {
  return (
    <sw.VStack>
      <sw.Text>SSSS</sw.Text>
      <sw.Text>SSSS</sw.Text>
    </sw.VStack>
  )
}

export function VStackWithSpacer () {
  return (
    <sw.VStack>
      <sw.Spacer />
      <sw.Text>SSSS</sw.Text>
      <sw.Text>SSSS</sw.Text>
    </sw.VStack>
  )
}
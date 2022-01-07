import React from 'react'
import { Story, Meta } from '@storybook/react'
import * as sw from '../index'

export default {
  title: 'Example/HStack',
  component: sw.HStack
} as Meta

export function HStackSpaceInMiddle () {
  return (
    <sw.HStack>
      <sw.Text>HHH</sw.Text>
      <sw.Spacer minLength="10"/>
      <sw.Text>HHH</sw.Text>
    </sw.HStack>
  )
}

export function HStackInLeft () {
  return (
    <sw.HStack>
      <sw.Spacer />
      <sw.Text>HHH</sw.Text>
      <sw.Text>HHH</sw.Text>
    </sw.HStack>
  )
}
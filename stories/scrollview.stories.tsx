import React from 'react'
import { Story, Meta } from '@storybook/react'
import { ScrollView, Spacer, Text} from '../src'

export default {
  title: 'SwiftUI/ScrollView',
  component: ScrollView
} as Meta

export function ScrollViewVertical () {
  return (
    <ScrollView>
      {Array(200).fill(0).map((v, i) => {
        return <>
          <Text>index {i}</Text>
          <Spacer minLength={4} />
        </>
      })}
    </ScrollView>
  )
}

export function ScrollViewHorizontal () {
  return (
    <ScrollView direction="horizontal">
      <Spacer />
      {Array(200).fill(0).map((v, i) => {
        return <>
          <Text>index {i}</Text>
          <Spacer minLength={4} />
        </>
      })}
    </ScrollView>
  )
}
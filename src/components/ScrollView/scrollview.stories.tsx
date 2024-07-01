import type { Meta } from '@storybook/react'
import { ScrollView, Spacer, Text} from '../'

export default {
  title: 'SwiftUI/ScrollView',
  component: ScrollView
} satisfies Meta


export function ScrollViewVertical () {
  return (
    <ScrollView>
      {Array(200).fill(0).map((_, i) => {
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
      {Array(200).fill(0).map((_, i) => {
        return <>
          <Text>index {i}</Text>
          <Spacer minLength={4} />
        </>
      })}
    </ScrollView>
  )
}
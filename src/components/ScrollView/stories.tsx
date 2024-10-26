import type { Meta, StoryObj } from '@storybook/react'
import { Spacer, Text} from '../'
import { ScrollView, IScrollViewProps } from '.'

const meta: Meta<typeof ScrollView> = {
  title: 'SwiftUI/ScrollView',
  component: ScrollView
}

export default meta

type Story = StoryObj<IScrollViewProps>

export const ScrollViewVertical: Story = {
  render() {
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
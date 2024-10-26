import type { Meta, StoryObj } from '@storybook/react'
import { Text, Spacer } from '../'
import { HStack, IHStackProps } from '.'

const meta: Meta<typeof HStack> = {
  title: 'SwiftUI/HStack',
  component: HStack
}

export default meta

type Story = StoryObj<IHStackProps>

export const HStackSpaceInMiddle: Story = {
  render(props) {
    return (
      <HStack {...props}>
        <Text>HHH</Text>
        <Spacer minLength="10"/>
        <Text>HHH</Text>
      </HStack>
    )
  }
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
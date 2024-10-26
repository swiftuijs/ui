import type { Meta, StoryObj } from '@storybook/react'
import { HStack, VStack, Text } from '../'
import { NavigationLink, INavigationLinkProps } from '.'

const meta: Meta<typeof NavigationLink> = {
  title: 'SwiftUI/NavigationLink',
  component: NavigationLink
}

export default meta

type Story = StoryObj<INavigationLinkProps>

export const NavigationLinkBetween: Story = {
  render() {
    return (
      <HStack>
        <Text>Left</Text>
        <NavigationLink />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export function NavigationLinkWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <NavigationLink>
        <Text>Right</Text>
      </NavigationLink>
      <Text>Right</Text>
    </VStack>
  )
}

export function NavigationLinkLeading () {
  return (
    <HStack>
      <NavigationLink />
      <Text>Text</Text>
    </HStack>
  )
}

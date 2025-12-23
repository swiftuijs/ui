import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../'
import { Link, ILinkProps } from '.'

const meta: Meta<typeof Link> = {
  title: 'SwiftUI/Link',
  component: Link
}

export default meta

type Story = StoryObj<ILinkProps>

export const LinkBetween: Story = {
  render() {
    return (
      <HStack>
        <Text>Left</Text>
        <Link destination={'https://forth.ink'} />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export function LinkWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <Link destination={'https://forth.ink'}>
        <Text>Right</Text>
      </Link>
      <Text>Right</Text>
    </VStack>
  )
}

export function LinkLeading () {
  return (
    <HStack>
      <Link destination={'https://forth.ink'} />
      <Text>Text</Text>
    </HStack>
  )
}

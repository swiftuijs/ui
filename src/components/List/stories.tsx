import type { Meta, StoryObj } from '@storybook/react-vite'
import { HStack, VStack, Text } from '../'
import { List, IListProps } from '.'

const meta: Meta<typeof List> = {
  title: 'SwiftUI/List',
  component: List
}

export default meta

type Story = StoryObj<IListProps>

export const ListBetween: Story = {
  render() {
    return (
      <HStack>
        <Text>Left</Text>
        <List />
        <Text>Right</Text>
      </HStack>
    )
  }
}

export function ListWithVStackBetween() {
  return (
    <VStack>
      <Text>Left</Text>
      <List>
        <Text>Right</Text>
      </List>
      <Text>Right</Text>
    </VStack>
  )
}

export function ListLeading () {
  return (
    <HStack>
      <List />
      <Text>Text</Text>
    </HStack>
  )
}

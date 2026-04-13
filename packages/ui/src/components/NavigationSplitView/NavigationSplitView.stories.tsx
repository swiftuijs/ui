import type { Meta, StoryObj } from '@storybook/react-vite'

import { List } from '../List'
import { NavigationLink } from '../NavigationLink'
import { Text } from '../Text'
import { VStack } from '../VStack'

import { NavigationSplitView, type INavigationSplitViewProps } from '.'

const meta: Meta<typeof NavigationSplitView> = {
  title: 'SwiftUI/NavigationSplitView',
  component: NavigationSplitView,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<INavigationSplitViewProps>

export const Default: Story = {
  render: () => (
    <NavigationSplitView
      sidebar={(
        <List>
          <Text>Inbox</Text>
          <Text>Favorites</Text>
        </List>
      )}
      content={(
        <VStack spacing={12}>
          <Text>Selected group</Text>
          <NavigationLink destination={() => <Text>Details</Text>}>Open thread</NavigationLink>
        </VStack>
      )}
      detail={<Text>Choose a message to inspect.</Text>}
    />
  ),
}

export const CompactDetail: Story = {
  render: () => (
    <NavigationSplitView
      compact
      sidebar={<Text>Sidebar</Text>}
      content={<Text>Content</Text>}
      detail={<Text>Detail</Text>}
    />
  ),
}

export const DetailOnly: Story = {
  render: () => (
    <NavigationSplitView
      columnVisibility="detailOnly"
      sidebar={<Text>Sidebar</Text>}
      content={<Text>Content</Text>}
      detail={<Text>Detail only focus</Text>}
    />
  ),
}

export const DoubleColumn: Story = {
  render: () => (
    <NavigationSplitView
      columnVisibility="doubleColumn"
      sidebar={<Text>Sidebar</Text>}
      content={<Text>Content</Text>}
      detail={<Text>Detail</Text>}
    />
  ),
}

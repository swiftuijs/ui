import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '../Card'
import { HStack } from '../HStack'
import { Text } from '../Text'
import { VStack } from '../VStack'

import { ViewThatFits, type IViewThatFitsProps } from '.'

const meta: Meta<typeof ViewThatFits> = {
  title: 'SwiftUI/ViewThatFits',
  component: ViewThatFits,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IViewThatFitsProps>

export const Default: Story = {
  render: () => (
    <ViewThatFits width={320}>
      <HStack data-min-width={520} spacing={16}>
        <Card><Text>Sidebar</Text></Card>
        <Card><Text>Detail</Text></Card>
      </HStack>
      <VStack data-min-width={300} spacing={12}>
        <Card><Text>Compact content</Text></Card>
        <Card><Text>Secondary section</Text></Card>
      </VStack>
      <Card>
        <Text>Fallback content</Text>
      </Card>
    </ViewThatFits>
  ),
}

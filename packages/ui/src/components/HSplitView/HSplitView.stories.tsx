import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '../Card'
import { Text } from '../Text'
import { VStack } from '../VStack'
import { HSplitView } from './index'

const meta: Meta<typeof HSplitView> = {
  title: 'SwiftUI/HSplitView',
  component: HSplitView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof HSplitView>

export const Default: Story = {
  render: () => (
    <HSplitView fractions={[1, 2]}>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Sidebar</Text>
          <Text>Navigation and filters</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Content</Text>
          <Text>Primary content surface</Text>
        </VStack>
      </Card>
    </HSplitView>
  ),
}

export const ThreePane: Story = {
  render: () => (
    <HSplitView fractions={[1, 2, 1]}>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Leading</Text>
          <Text>Leading pane</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Center</Text>
          <Text>Center pane</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Trailing</Text>
          <Text>Trailing pane</Text>
        </VStack>
      </Card>
    </HSplitView>
  ),
}

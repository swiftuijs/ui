import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '../Card'
import { Text } from '../Text'
import { VStack } from '../VStack'
import { VSplitView } from './index'

const meta: Meta<typeof VSplitView> = {
  title: 'SwiftUI/VSplitView',
  component: VSplitView,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof VSplitView>

export const Default: Story = {
  render: () => (
    <VSplitView fractions={[1, 2]}>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Top</Text>
          <Text>Top pane content</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Bottom</Text>
          <Text>Bottom pane content</Text>
        </VStack>
      </Card>
    </VSplitView>
  ),
}

export const ThreePane: Story = {
  render: () => (
    <VSplitView fractions={[1, 1, 2]}>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Header</Text>
          <Text>Header pane</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Summary</Text>
          <Text>Summary pane</Text>
        </VStack>
      </Card>
      <Card>
        <VStack spacing={8} style={{ padding: '16px' }}>
          <Text style={{ fontWeight: 600 }}>Detail</Text>
          <Text>Detail pane</Text>
        </VStack>
      </Card>
    </VSplitView>
  ),
}

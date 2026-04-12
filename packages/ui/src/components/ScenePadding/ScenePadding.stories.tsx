import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '../Card'
import { Text } from '../Text'
import { VStack } from '../VStack'

import { ScenePadding, type IScenePaddingProps } from './index'

const meta: Meta<typeof ScenePadding> = {
  title: 'SwiftUI/ScenePadding',
  component: ScenePadding,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IScenePaddingProps>

export const Default: Story = {
  render: () => (
    <ScenePadding>
      <Card>
        <Text>Scene-level content padding</Text>
      </Card>
    </ScenePadding>
  ),
}

export const CompactEdges: Story = {
  render: () => (
    <ScenePadding edges={['top', 'horizontal']} size="compact">
      <VStack spacing={10}>
        <Text>Top and horizontal inset</Text>
        <Card>
          <Text>Compact scene inset</Text>
        </Card>
      </VStack>
    </ScenePadding>
  ),
}

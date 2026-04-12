import type { Meta, StoryObj } from '@storybook/react-vite'

import { Button } from '../Button'
import { HStack } from '../HStack'

import { MatchedGeometryEffect, type IMatchedGeometryEffectProps } from './index'

const meta: Meta<typeof MatchedGeometryEffect> = {
  title: 'SwiftUI/MatchedGeometryEffect',
  component: MatchedGeometryEffect,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IMatchedGeometryEffectProps>

export const SharedCard: Story = {
  render: () => (
    <HStack spacing={12}>
      <MatchedGeometryEffect id="card" namespace="gallery" role="source">
        <Button
          style={{
            backgroundColor: 'transparent',
            border: '1px solid var(--sw-color-primary, #007aff)',
          }}>
          Compact card
        </Button>
      </MatchedGeometryEffect>
      <MatchedGeometryEffect id="card" namespace="gallery" role="target" properties="frame">
        <Button>Expanded card</Button>
      </MatchedGeometryEffect>
    </HStack>
  ),
}

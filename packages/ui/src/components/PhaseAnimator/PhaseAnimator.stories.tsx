import type { Meta, StoryObj } from '@storybook/react'

import { Button } from '../Button'
import { Card } from '../Card'
import { Text } from '../Text'
import { VStack } from '../VStack'
import { PhaseAnimator } from './index'

const meta: Meta<typeof PhaseAnimator> = {
  title: 'SwiftUI/PhaseAnimator',
  component: PhaseAnimator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof PhaseAnimator>

export const Automatic: Story = {
  render: () => (
    <PhaseAnimator
      interval={900}
      phases={['idle', 'pressed', 'settled']}
    >
      {(phase) => (
        <Card>
          <VStack spacing={8} style={{ padding: '16px' }}>
            <Text style={{ fontWeight: 600 }}>Current phase</Text>
            <Text>{phase}</Text>
          </VStack>
        </Card>
      )}
    </PhaseAnimator>
  ),
}

export const OnDemand: Story = {
  render: () => {
    return (
      <PhaseAnimator
        phases={['collapsed', 'expanded', 'settled']}
        trigger="onDemand"
      >
        {(phase, controls) => {
          return (
            <VStack spacing={12}>
              <Card>
                <VStack spacing={8} style={{ padding: '16px' }}>
                  <Text style={{ fontWeight: 600 }}>Current phase</Text>
                  <Text>{phase}</Text>
                </VStack>
              </Card>
              <Button onClick={controls.advance}>Advance phase</Button>
            </VStack>
          )
        }}
      </PhaseAnimator>
    )
  },
}

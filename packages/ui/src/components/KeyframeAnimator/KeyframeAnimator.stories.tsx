import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '../Card'
import { KeyframeAnimator } from './index'

const meta: Meta<typeof KeyframeAnimator> = {
  title: 'SwiftUI/KeyframeAnimator',
  component: KeyframeAnimator,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof KeyframeAnimator>

export const Default: Story = {
  render: () => (
    <KeyframeAnimator
      interval={700}
      keyframes={[
        { scale: 1, opacity: 0.45 },
        { scale: 1.08, opacity: 0.75 },
        { scale: 1.15, opacity: 1 },
      ]}
    >
      {(frame) => (
        <Card>
          <div
            style={{
              padding: '24px',
              textAlign: 'center',
              transform: `scale(${frame.scale})`,
              opacity: frame.opacity,
              transition: 'transform 200ms ease, opacity 200ms ease',
            }}
          >
            Keyframe content
          </div>
        </Card>
      )}
    </KeyframeAnimator>
  ),
}

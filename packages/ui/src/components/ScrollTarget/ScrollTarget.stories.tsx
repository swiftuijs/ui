import type { Meta, StoryObj } from '@storybook/react'

import { Card } from '../Card'
import { ScrollTarget } from './index'

const meta: Meta<typeof ScrollTarget> = {
  title: 'SwiftUI/ScrollTarget',
  component: ScrollTarget,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ScrollTarget>

export const Default: Story = {
  args: {
    scrollId: 'chapter-2',
    children: (
      <Card>
        <div style={{ padding: '16px' }}>Scroll target content</div>
      </Card>
    ),
  },
}

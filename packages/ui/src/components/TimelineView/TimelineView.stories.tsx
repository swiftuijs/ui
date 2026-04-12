import type { Meta, StoryObj } from '@storybook/react-vite'

import { TimelineView } from '.'

const meta = {
  title: 'SwiftUI/TimelineView',
  component: TimelineView,
  args: {
    children: () => null,
    interval: 1000,
  },
} satisfies Meta<typeof TimelineView>

export default meta

type Story = StoryObj<typeof meta>

export const Clock: Story = {
  args: {
    interval: 1000,
  },
  render: (args) => (
    <TimelineView {...args}>
      {(date) => <output>{date.toLocaleTimeString()}</output>}
    </TimelineView>
  ),
}

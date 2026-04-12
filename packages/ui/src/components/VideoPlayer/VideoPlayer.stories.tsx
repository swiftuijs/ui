import type { Meta, StoryObj } from '@storybook/react-vite'

import { VideoPlayer } from '.'

const meta = {
  title: 'SwiftUI/VideoPlayer',
  component: VideoPlayer,
  args: {
    'aria-label': 'Sample trailer',
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
} satisfies Meta<typeof VideoPlayer>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithFallback: Story = {
  render: (args) => (
    <VideoPlayer {...args}>
      <p>Your browser does not support inline video playback.</p>
    </VideoPlayer>
  ),
}

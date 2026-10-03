import type { Meta, StoryObj } from '@storybook/react-vite'
import { useState } from 'react'

import { AsyncImage, type IAsyncImageProps } from '.'

const meta: Meta<typeof AsyncImage> = {
  title: 'SwiftUI/AsyncImage',
  component: AsyncImage,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IAsyncImageProps>

export const Default: Story = {
  args: {
    src: 'data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E',
    alt: 'Remote image',
    placeholder: 'Loading image…',
  },
}

export const WithFallback: Story = {
  args: {
    src: 'https://example.invalid/not-found.png',
    alt: 'Missing image',
    placeholder: 'Loading image…',
    fallback: 'Image unavailable',
  },
}

export const MissingSource: Story = {
  args: {
    src: '',
    alt: 'Missing image',
    fallback: 'Image unavailable',
  },
}

function PhaseAwareDemo() {
  const [phase, setPhase] = useState('loading')

  return (
    <div style={{ display: 'grid', gap: 12 }}>
      <AsyncImage
        src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27320%27 height=%27180%27 viewBox=%270 0 320 180%27%3E%3Crect width=%27320%27 height=%27180%27 fill=%27%2377b7df%27/%3E%3Cpath d=%27M0 180 100 65 165 130 235 45 320 180%27 fill=%27%23286356%27/%3E%3Ccircle cx=%2768%27 cy=%2740%27 r=%2716%27 fill=%27%23ffdc80%27/%3E%3C/svg%3E"
        alt="Phase aware image"
        placeholder="Loading image…"
        onPhaseChange={setPhase}
      />
      <div>Current phase: {phase}</div>
    </div>
  )
}

export const PhaseAware: Story = {
  render: () => <PhaseAwareDemo />,
}

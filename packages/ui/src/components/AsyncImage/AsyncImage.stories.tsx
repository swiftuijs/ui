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
    src: 'https://via.placeholder.com/320x180',
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
        src="https://via.placeholder.com/320x180"
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

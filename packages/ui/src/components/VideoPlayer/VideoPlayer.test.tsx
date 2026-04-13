import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { VideoPlayer } from '.'

describe('VideoPlayer', () => {
  it('renders a native video element with the provided source', () => {
    render(<VideoPlayer aria-label="Trailer" src="https://example.com/trailer.mp4" />)

    const video = screen.getByLabelText('Trailer')

    expect(video.tagName).toBe('VIDEO')
    expect(video).toHaveAttribute('src', 'https://example.com/trailer.mp4')
    expect(video).toHaveAttribute('controls')
  })

  it('renders fallback content when provided', () => {
    render(
      <VideoPlayer aria-label="Clip" src="https://example.com/clip.mp4">
        <p>Video unavailable</p>
      </VideoPlayer>,
    )

    expect(screen.getByText('Video unavailable')).toBeInTheDocument()
  })

  it('tracks loading and ready states for the current source', () => {
    render(<VideoPlayer aria-label="Trailer" src="https://example.com/trailer.mp4" />)

    const video = screen.getByLabelText('Trailer')

    expect(video).toHaveAttribute('data-state', 'loading')

    fireEvent.loadedData(video)

    expect(video).toHaveAttribute('data-state', 'ready')
  })

  it('reports playback state transitions and resets when the source changes', () => {
    const phases: string[] = []
    const { rerender } = render(
      <VideoPlayer
        aria-label="Trailer"
        onPlaybackStateChange={(state) => phases.push(state)}
        src="https://example.com/trailer.mp4"
      />,
    )

    const video = screen.getByLabelText('Trailer')

    fireEvent.loadedData(video)
    fireEvent.play(video)
    fireEvent.pause(video)

    rerender(
      <VideoPlayer
        aria-label="Trailer"
        onPlaybackStateChange={(state) => phases.push(state)}
        src="https://example.com/alternate.mp4"
      />,
    )

    expect(video).toHaveAttribute('data-state', 'loading')
    expect(phases).toEqual(['loading', 'ready', 'playing', 'paused', 'loading'])
  })

  it('enters the error state when the media source fails or is missing', () => {
    const { rerender } = render(<VideoPlayer aria-label="Clip" src="https://example.com/clip.mp4" />)

    const video = screen.getByLabelText('Clip')

    fireEvent.error(video)

    expect(video).toHaveAttribute('data-state', 'error')

    rerender(<VideoPlayer aria-label="Clip" src="" />)

    expect(video).toHaveAttribute('data-state', 'error')
  })
})

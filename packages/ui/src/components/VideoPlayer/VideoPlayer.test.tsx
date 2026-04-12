import { render, screen } from '@testing-library/react'
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
})

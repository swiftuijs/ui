import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'

import { render, screen } from '@/testing/render'

import { KeyframeAnimator } from './index'

describe('KeyframeAnimator', () => {
  it('steps through declared keyframes on the provided interval', () => {
    vi.useFakeTimers()

    render(
      <KeyframeAnimator
        interval={500}
        keyframes={[
          { scale: 1, opacity: 0.4 },
          { scale: 1.1, opacity: 0.7 },
          { scale: 1.2, opacity: 1 },
        ]}
      >
        {(frame) => (
          <div>
            {frame.scale}-{frame.opacity}
          </div>
        )}
      </KeyframeAnimator>,
    )

    expect(screen.getByText('1-0.4')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText('1.1-0.7')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText('1.2-1')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('stops advancing when repeat is false and the last keyframe is reached', () => {
    vi.useFakeTimers()

    render(
      <KeyframeAnimator
        interval={250}
        repeat={false}
        keyframes={[
          { x: 0 },
          { x: 10 },
        ]}
      >
        {(frame) => <div>{frame.x}</div>}
      </KeyframeAnimator>,
    )

    act(() => {
      vi.advanceTimersByTime(500)
    })

    expect(screen.getByText('10')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('10')).toBeInTheDocument()

    vi.useRealTimers()
  })
})

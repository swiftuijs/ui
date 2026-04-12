import { act, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { TimelineView } from '.'

describe('TimelineView', () => {
  it('renders content with the current date immediately', () => {
    render(
      <TimelineView interval={1000}>
        {(date) => <output>{date instanceof Date ? 'ready' : 'missing'}</output>}
      </TimelineView>,
    )

    expect(screen.getByText('ready')).toBeInTheDocument()
  })

  it('updates the rendered timeline content on each interval', () => {
    vi.useFakeTimers()
    const renderFrame = vi.fn((date: Date) => <output>{date.toISOString()}</output>)

    render(<TimelineView interval={1000}>{renderFrame}</TimelineView>)

    expect(renderFrame).toHaveBeenCalledTimes(1)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(renderFrame).toHaveBeenCalledTimes(4)
    vi.useRealTimers()
  })
})

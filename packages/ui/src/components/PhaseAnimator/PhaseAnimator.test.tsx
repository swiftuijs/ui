import { act } from 'react'
import { describe, expect, it, vi, afterEach } from 'vitest'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { PhaseAnimator } from './index'

describe('PhaseAnimator', () => {
  afterEach(() => { vi.useRealTimers(); vi.unstubAllGlobals() })
  it('responds to Reduce Motion changes while mounted and keeps manual controls usable', () => {
    vi.useFakeTimers()
    const listeners = new Set<() => void>()
    const media = { matches: true, addEventListener: (_: string, fn: () => void) => listeners.add(fn), removeEventListener: (_: string, fn: () => void) => listeners.delete(fn) }
    vi.stubGlobal('matchMedia', () => media)
    render(<PhaseAnimator interval={100} phases={['first', 'second']}>
      {(phase, controls) => <button onClick={controls.advance}>{phase}</button>}
    </PhaseAnimator>)
    act(() => vi.advanceTimersByTime(500))
    expect(screen.getByRole('button')).toHaveTextContent('first')
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('second')
    act(() => { media.matches = false; listeners.forEach(fn => fn()) })
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByRole('button')).toHaveTextContent('first')
    act(() => { media.matches = true; listeners.forEach(fn => fn()) })
    act(() => vi.advanceTimersByTime(500))
    expect(screen.getByRole('button')).toHaveTextContent('first')
  })
  it('releases its timer after a non-repeating sequence finishes', () => {
    vi.useFakeTimers()
    render(<PhaseAnimator interval={100} repeat={false} phases={['first', 'last']}>
      {phase => <div>{phase}</div>}
    </PhaseAnimator>)
    act(() => vi.advanceTimersByTime(100))
    expect(screen.getByText('last')).toBeInTheDocument()
    expect(vi.getTimerCount()).toBe(0)
  })
  it('renders the current phase and advances automatically when running', () => {
    vi.useFakeTimers()

    render(
      <PhaseAnimator
        interval={1000}
        phases={['idle', 'pressed', 'settled']}
      >
        {(phase) => <div>{phase}</div>}
      </PhaseAnimator>,
    )

    expect(screen.getByText('idle')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('pressed')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.getByText('settled')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('supports manual triggers when trigger mode is onDemand', async () => {
    const user = userEvent.setup()

    render(
      <PhaseAnimator
        phases={['collapsed', 'expanded']}
        trigger="onDemand"
      >
        {(phase, controls) => (
          <>
            <div>{phase}</div>
            <button type="button" onClick={controls.advance}>
              Next phase
            </button>
          </>
        )}
      </PhaseAnimator>,
    )

    expect(screen.getByText('collapsed')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Next phase' }))

    expect(screen.getByText('expanded')).toBeInTheDocument()
  })
})

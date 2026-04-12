import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { PhaseAnimator } from './index'

describe('PhaseAnimator', () => {
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

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen, waitFor } from '@/testing/render'

import { Refreshable } from './index'

describe('Refreshable', () => {
  it('invokes refresh work and exposes a busy state', async () => {
    const user = userEvent.setup()
    let resolveRefresh: (() => void) | undefined
    const onRefresh = vi.fn(
      () =>
        new Promise<void>((resolve) => {
          resolveRefresh = resolve
        })
    )

    render(
      <Refreshable onRefresh={onRefresh}>
        <div>Inbox content</div>
      </Refreshable>
    )

    await user.click(screen.getByRole('button', { name: 'Refresh content' }))

    expect(onRefresh).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Refreshing…' })).toHaveAttribute('aria-busy', 'true')

    resolveRefresh?.()

    await waitFor(() => {
      expect(screen.getByRole('button', { name: 'Refresh content' })).toHaveAttribute('aria-busy', 'false')
    })
  })
})

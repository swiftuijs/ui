import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { SwipeActions } from './index'

describe('SwipeActions', () => {
  it('reveals trailing actions in uncontrolled mode', async () => {
    const user = userEvent.setup()
    const onFlag = vi.fn()

    render(
      <SwipeActions
        actions={[{ label: 'Flag', action: onFlag }]}
      >
        <div>Message row</div>
      </SwipeActions>
    )

    expect(screen.queryByRole('button', { name: 'Flag' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Show actions for Message row' }))

    await user.click(screen.getByRole('button', { name: 'Flag' }))

    expect(onFlag).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('button', { name: 'Flag' })).not.toBeInTheDocument()
  })

  it('supports controlled open state', async () => {
    const user = userEvent.setup()
    const onOpenChange = vi.fn()

    render(
      <SwipeActions
        actions={[{ label: 'Delete' }]}
        open
        onOpenChange={onOpenChange}
      >
        <div>Draft row</div>
      </SwipeActions>
    )

    expect(screen.getByRole('button', { name: 'Delete' })).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Hide actions for Draft row' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('renders leading actions when requested', async () => {
    const user = userEvent.setup()

    render(
      <SwipeActions
        actions={[{ label: 'Pin' }]}
        edge="leading"
      >
        <div>Conversation row</div>
      </SwipeActions>
    )

    await user.click(screen.getByRole('button', { name: 'Show actions for Conversation row' }))

    const actionGroup = screen.getByRole('group', { name: 'Swipe actions' })
    expect(actionGroup).toHaveAttribute('data-edge', 'leading')
  })
})

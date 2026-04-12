import { createRef, type ComponentRef } from 'react'

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { Popover } from './index'

describe('Popover', () => {
  it('does not render when hidden', () => {
    const anchorRef = createRef<ComponentRef<'button'>>()

    render(
      <>
        <button ref={anchorRef} type="button">
          Anchor
        </button>
        <Popover anchorRef={anchorRef} isPresented={false}>
          Popover content
        </Popover>
      </>,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders a popover anchored to the trigger and dismisses on outside click', async () => {
    const user = userEvent.setup()
    const dismiss = vi.fn()
    const anchorRef = createRef<ComponentRef<'button'>>()

    render(
      <div>
        <button ref={anchorRef} type="button">
          More
        </button>
        <Popover anchorRef={anchorRef} isPresented onDismiss={dismiss}>
          <div>Popover content</div>
        </Popover>
      </div>,
    )

    const dialog = screen.getByRole('dialog')
    expect(dialog).toBeInTheDocument()
    expect(screen.getByText('Popover content')).toBeInTheDocument()

    await user.click(document.body)

    expect(dismiss).toHaveBeenCalledTimes(1)
  })

  it('dismisses on Escape', async () => {
    const user = userEvent.setup()
    const dismiss = vi.fn()
    const anchorRef = createRef<ComponentRef<'button'>>()

    render(
      <>
        <button ref={anchorRef} type="button">
          More
        </button>
        <Popover anchorRef={anchorRef} isPresented onDismiss={dismiss}>
          <div>Popover content</div>
        </Popover>
      </>,
    )

    await user.keyboard('{Escape}')

    expect(dismiss).toHaveBeenCalledTimes(1)
  })

  it('uses the anchor width when requested', () => {
    const anchorRef = createRef<ComponentRef<'button'>>()

    render(
      <>
        <button ref={anchorRef} type="button">
          More
        </button>
        <Popover anchorRef={anchorRef} isPresented matchAnchorWidth>
          <div>Popover content</div>
        </Popover>
      </>,
    )

    expect(screen.getByRole('dialog')).toHaveStyle({ width: '0px' })
  })
})

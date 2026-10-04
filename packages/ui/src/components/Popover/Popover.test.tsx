import { createRef, type ComponentRef } from 'react'

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { Popover } from './index'
import { Sheet } from '../Sheet'
import { UIProvider } from '../UIProvider'

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

it('keeps the popover open when its own controls are used', async () => {
  const anchorRef = createRef<HTMLButtonElement>()
  const dismiss = vi.fn(), action = vi.fn()
  render(<><button ref={anchorRef}>Anchor</button><Popover anchorRef={anchorRef} isPresented onDismiss={dismiss}>
    <button onClick={action}>Inside action</button>
  </Popover></>)
  await userEvent.click(screen.getByRole('button', { name: 'Inside action' }))
  expect(action).toHaveBeenCalledOnce()
  expect(dismiss).not.toHaveBeenCalled()
})

it('portals within its enclosing sheet and consumes Escape before sheet dismissal', async () => {
  const anchorRef = createRef<HTMLButtonElement>()
  const dismissPopover = vi.fn(), dismissSheet = vi.fn()
  render(<Sheet title="Editor" isPresented onDismiss={dismissSheet}>
    <button ref={anchorRef}>Help</button>
    <Popover title="Editor help" anchorRef={anchorRef} isPresented onDismiss={dismissPopover}>Help content</Popover>
  </Sheet>)
  const popover = screen.getByRole('dialog', { name: 'Editor help' })
  expect(popover.closest('.sw-sheet')).toBe(screen.getByRole('dialog', { name: 'Editor' }))
  await userEvent.keyboard('{Escape}')
  expect(dismissPopover).toHaveBeenCalledOnce()
  expect(dismissSheet).not.toHaveBeenCalled()
})

it('preserves a scoped theme when portaled outside its provider DOM', () => {
  const anchorRef = createRef<HTMLButtonElement>()
  render(<UIProvider theme="dark"><button ref={anchorRef}>Help</button>
    <Popover anchorRef={anchorRef} isPresented>Dark help</Popover>
  </UIProvider>)
  const popover = screen.getByRole('dialog')
  expect(popover.closest('.sw-ui-provider')).toBeNull()
  expect(popover).toHaveAttribute('data-theme', 'dark')
})

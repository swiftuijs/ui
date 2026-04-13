import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { Sheet } from './index'

describe('Sheet', () => {
  it('dismisses when the backdrop is activated', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <Sheet isPresented onDismiss={onDismiss}>
        <div>Sheet body</div>
      </Sheet>,
    )

    await user.click(screen.getByRole('presentation'))

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('hides the drag indicator and marks fullScreen presentations for full-screen cover usage', () => {
    render(
      <Sheet
        isPresented
        presentationStyle="fullScreen"
      >
        <div>Full screen content</div>
      </Sheet>,
    )

    const dialog = screen.getByRole('dialog')

    expect(dialog).toHaveAttribute('data-presentation-style', 'fullScreen')
    expect(dialog).toHaveClass('sw-sheet-fullScreen')
    expect(screen.queryByTestId('sheet-drag-indicator')).not.toBeInTheDocument()
  })

  it('can disable backdrop dismissal when background interaction is none', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <Sheet
        isPresented
        backgroundInteraction="none"
        onDismiss={onDismiss}
      >
        <div>Locked sheet</div>
      </Sheet>,
    )

    await user.click(screen.getByRole('presentation'))

    expect(onDismiss).not.toHaveBeenCalled()
  })

  it('exposes background style and custom corner radius metadata', () => {
    render(
      <Sheet
        isPresented
        backgroundStyle="thinMaterial"
        cornerRadius={28}
      >
        <div>Styled sheet</div>
      </Sheet>,
    )

    const dialog = screen.getByRole('dialog')

    expect(dialog).toHaveAttribute('data-background-style', 'thinMaterial')
    expect(dialog).toHaveClass('sw-sheet-thinMaterial')
    expect(dialog).toHaveStyle({ '--sw-sheet-corner-radius': '28px' })
  })

  it('marks configured presentation detents and the selected detent', () => {
    render(
      <Sheet
        isPresented
        presentationDetents={['medium', 'large']}
        selectedDetent="large"
      >
        <div>Detented sheet</div>
      </Sheet>,
    )

    const dialog = screen.getByRole('dialog')

    expect(dialog).toHaveAttribute('data-presentation-detents', 'medium,large')
    expect(dialog).toHaveAttribute('data-selected-detent', 'large')
    expect(dialog).toHaveStyle({ '--sw-sheet-height': '90%' })
  })

  it('cycles through presentation detents in uncontrolled mode from the drag indicator control', async () => {
    const user = userEvent.setup()

    render(
      <Sheet
        isPresented
        presentationDetents={['medium', 'large']}
      >
        <div>Detented sheet</div>
      </Sheet>,
    )

    const dialog = screen.getByRole('dialog')
    const dragIndicator = screen.getByRole('button', { name: 'Adjust sheet height' })

    expect(dialog).toHaveAttribute('data-selected-detent', 'medium')
    expect(dialog).toHaveStyle({ '--sw-sheet-height': '60%' })

    await user.click(dragIndicator)

    expect(dialog).toHaveAttribute('data-selected-detent', 'large')
    expect(dialog).toHaveStyle({ '--sw-sheet-height': '90%' })
  })

  it('emits detent changes in controlled mode without mutating local state', async () => {
    const user = userEvent.setup()
    const onSelectedDetentChange = vi.fn()

    render(
      <Sheet
        isPresented
        presentationDetents={['medium', 'large']}
        selectedDetent="medium"
        onSelectedDetentChange={onSelectedDetentChange}
      >
        <div>Controlled detent sheet</div>
      </Sheet>,
    )

    const dialog = screen.getByRole('dialog')

    await user.click(screen.getByRole('button', { name: 'Adjust sheet height' }))

    expect(onSelectedDetentChange).toHaveBeenCalledTimes(1)
    expect(onSelectedDetentChange).toHaveBeenCalledWith('large')
    expect(dialog).toHaveAttribute('data-selected-detent', 'medium')
    expect(dialog).toHaveStyle({ '--sw-sheet-height': '60%' })
  })

  it('dismisses on Escape by default', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <Sheet isPresented onDismiss={onDismiss}>
        <div>Keyboard sheet</div>
      </Sheet>,
    )

    await user.keyboard('{Escape}')

    expect(onDismiss).toHaveBeenCalledTimes(1)
  })

  it('can disable interactive dismiss behavior', async () => {
    const user = userEvent.setup()
    const onDismiss = vi.fn()

    render(
      <Sheet
        isPresented
        interactiveDismissDisabled
        onDismiss={onDismiss}
      >
        <div>Locked presentation</div>
      </Sheet>,
    )

    await user.click(screen.getByRole('presentation'))
    await user.keyboard('{Escape}')

    expect(onDismiss).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toHaveAttribute('data-interactive-dismiss-disabled', 'true')
  })
})

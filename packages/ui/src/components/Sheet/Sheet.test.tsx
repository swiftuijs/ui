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

    await user.click(screen.getByRole('presentation', { hidden: true }))

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

    await user.click(screen.getByRole('presentation', { hidden: true }))

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
    expect(dialog).toHaveStyle({ '--sw-sheet-height': '50%' })

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
    expect(dialog).toHaveStyle({ '--sw-sheet-height': '50%' })
  })

  it('resets uncontrolled detent state when the sheet is presented again', async () => {
    const user = userEvent.setup()

    const { rerender } = render(
      <Sheet
        isPresented
        defaultSelectedDetent="medium"
        presentationDetents={['medium', 'large']}
      >
        <div>Detented sheet</div>
      </Sheet>,
    )

    await user.click(screen.getByRole('button', { name: 'Adjust sheet height' }))
    expect(screen.getByRole('dialog')).toHaveAttribute('data-selected-detent', 'large')

    rerender(
      <Sheet
        isPresented={false}
        defaultSelectedDetent="medium"
        presentationDetents={['medium', 'large']}
      >
        <div>Detented sheet</div>
      </Sheet>,
    )

    rerender(
      <Sheet
        isPresented
        defaultSelectedDetent="medium"
        presentationDetents={['medium', 'large']}
      >
        <div>Detented sheet</div>
      </Sheet>,
    )

    expect(screen.getByRole('dialog')).toHaveAttribute('data-selected-detent', 'medium')
    expect(screen.getByRole('dialog')).toHaveStyle({ '--sw-sheet-height': '50%' })
  })

  it('falls back to the first configured detent when a selected detent is unavailable', () => {
    render(
      <Sheet
        isPresented
        presentationDetents={['medium', 'large']}
        selectedDetent={240}
      >
        <div>Detented sheet</div>
      </Sheet>,
    )

    expect(screen.getByRole('dialog')).toHaveAttribute('data-selected-detent', 'medium')
    expect(screen.getByRole('dialog')).toHaveStyle({ '--sw-sheet-height': '50%' })
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

    await user.click(screen.getByRole('presentation', { hidden: true }))
    await user.keyboard('{Escape}')

    expect(onDismiss).not.toHaveBeenCalled()
    expect(screen.getByRole('dialog')).toHaveAttribute('data-interactive-dismiss-disabled', 'true')
  })
})


it.each([
  [240, '240px'],
  ['42%', '42%'],
])('supports custom detent %s without converting it to a preset', (detent, height) => {
  render(<Sheet isPresented presentationDetents={[detent as 240 | '42%']}><button>Close</button></Sheet>)
  expect(screen.getByRole('dialog')).toHaveStyle({ '--sw-sheet-height': height })
})

it('uses an explicit ARIA label supplied by the React consumer', () => {
  render(<Sheet isPresented aria-label="Edit schedule"><button>Save schedule</button></Sheet>)
  expect(screen.getByRole('dialog', { name: 'Edit schedule' })).toBeInTheDocument()
})

it('supports a visible title as its accessible label', () => {
  render(<Sheet isPresented aria-labelledby="editor-heading"><h2 id="editor-heading">Edit workspace</h2></Sheet>)
  expect(screen.getByRole('dialog', { name: 'Edit workspace' })).toBeInTheDocument()
})

it('allows an empty detent list to use the default presentation height', () => {
  render(<Sheet isPresented presentationDetents={[]}><button>Close editor</button></Sheet>)
  expect(screen.getByRole('dialog')).toHaveAttribute('data-selected-detent', 'large')
  expect(screen.getByRole('button', { name: 'Adjust sheet height' })).toBeEnabled()
})

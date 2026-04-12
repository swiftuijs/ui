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
})

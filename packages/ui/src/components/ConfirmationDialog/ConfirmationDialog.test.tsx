import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { ConfirmationDialog } from './index'

describe('ConfirmationDialog', () => {
  it('does not render when hidden', () => {
    render(
      <ConfirmationDialog
        isVisible={false}
        onDismiss={() => {}}
        actions={[{ label: 'Delete', action: () => {} }]}
      />,
    )

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('renders a dialog with title, message, and actions', async () => {
    const user = userEvent.setup()
    const confirm = vi.fn()
    const dismiss = vi.fn()

    render(
      <ConfirmationDialog
        title="Delete draft?"
        message="This action cannot be undone."
        isVisible
        onDismiss={dismiss}
        actions={[
          { label: 'Delete', action: confirm, style: 'destructive' },
          { label: 'Cancel', action: () => {}, style: 'cancel' },
        ]}
      />,
    )

    expect(screen.getByRole('dialog', { name: 'Delete draft?' })).toBeInTheDocument()
    expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Delete' }))

    expect(confirm).toHaveBeenCalledTimes(1)
    expect(dismiss).toHaveBeenCalledTimes(1)
  })

  it('dismisses on backdrop click and Escape', async () => {
    const user = userEvent.setup()
    const dismiss = vi.fn()

    const { container } = render(
      <ConfirmationDialog
        title="Discard changes?"
        isVisible
        onDismiss={dismiss}
        actions={[{ label: 'Discard', action: () => {}, style: 'destructive' }]}
      />,
    )

    await user.click(container.querySelector('.sw-confirmation-dialog-backdrop') as HTMLElement)
    expect(dismiss).toHaveBeenCalledTimes(1)

    await user.keyboard('{Escape}')
    expect(dismiss).toHaveBeenCalledTimes(2)
  })
})

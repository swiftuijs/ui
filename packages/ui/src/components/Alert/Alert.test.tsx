import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { Alert } from './index'

describe('Alert', () => {
  describe('primitive checklist', () => {
    it('does not render when hidden', () => {
      render(
        <Alert
          title="Hidden alert"
          isVisible={false}
          onDismiss={() => {}}
        />
      )

      expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    })

    it('renders alertdialog semantics with title, message, and default dismiss action', async () => {
      const user = userEvent.setup()
      const handleDismiss = vi.fn()

      render(
        <Alert
          title="Delete draft?"
          message="This action cannot be undone."
          isVisible
          onDismiss={handleDismiss}
        />
      )

      const dialog = screen.getByRole('alertdialog', { name: 'Delete draft?' })

      expect(dialog).toHaveAttribute('aria-modal', 'true')
      expect(screen.getByText('This action cannot be undone.')).toBeInTheDocument()

      await user.click(screen.getByRole('button', { name: 'OK' }))

      expect(handleDismiss).toHaveBeenCalledTimes(1)
    })

    it('dismisses on backdrop click and Escape', async () => {
      const user = userEvent.setup()
      const handleDismiss = vi.fn()

      const { container } = render(
        <Alert
          title="Network issue"
          isVisible
          onDismiss={handleDismiss}
        />
      )

      await user.click(container.querySelector('.sw-alert-backdrop') as HTMLElement)
      expect(handleDismiss).toHaveBeenCalledTimes(1)

      await user.keyboard('{Escape}')
      expect(handleDismiss).toHaveBeenCalledTimes(2)
    })

    it('renders custom buttons and preserves their actions', async () => {
      const user = userEvent.setup()
      const confirm = vi.fn()
      const cancel = vi.fn()

      render(
        <Alert
          title="Replace file?"
          isVisible
          onDismiss={cancel}
          buttons={[
            { label: 'Cancel', action: cancel, style: 'cancel' },
            { label: 'Replace', action: confirm, style: 'destructive' },
          ]}
        />
      )

      await user.click(screen.getByRole('button', { name: 'Replace' }))

      expect(confirm).toHaveBeenCalledTimes(1)
      expect(cancel).not.toHaveBeenCalled()
    })
  })
})

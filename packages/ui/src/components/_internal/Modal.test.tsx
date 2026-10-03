import { useState } from 'react'
import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { Sheet } from '../Sheet'
import { Alert } from '../Alert'

function Workflow() {
  const [open, setOpen] = useState(false)
  const [confirmation, setConfirmation] = useState(false)
  return <>
    <button onClick={() => setOpen(true)}>Open editor</button>
    <button>Background action</button>
    <Sheet title="Edit profile" isPresented={open} onDismiss={() => setOpen(false)} showDragIndicator={false}>
      <input aria-label="Name" />
      <button onClick={() => setConfirmation(true)}>Save profile</button>
      <Alert title="Saved profile" isVisible={confirmation} onDismiss={() => setConfirmation(false)} />
    </Sheet>
  </>
}

describe('modal workflow', () => {
  it('names, focuses and isolates the modal, traps Tab, and restores the opener', async () => {
    const user = userEvent.setup()
    render(<Workflow />)
    const opener = screen.getByRole('button', { name: 'Open editor' })
    await user.click(opener)
    const dialog = screen.getByRole('dialog', { name: 'Edit profile' })
    const input = screen.getByRole('textbox', { name: 'Name' })
    expect(input).toHaveFocus()
    expect(screen.queryByRole('button', { name: 'Background action' })).not.toBeInTheDocument()
    expect(document.body).toHaveAttribute('data-scroll-locked')
    await user.tab({ shift: true })
    expect(screen.getByRole('button', { name: 'Save profile' })).toHaveFocus()
    await user.tab()
    expect(input).toHaveFocus()
    expect(dialog).toContainElement(document.activeElement as HTMLElement)
    await user.keyboard('{Escape}')
    await waitFor(() => expect(opener).toHaveFocus())
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    expect(document.body).not.toHaveAttribute('data-scroll-locked')
  })

  it('Escape closes only the top modal and returns focus to the parent action', async () => {
    const user = userEvent.setup()
    render(<Workflow />)
    await user.click(screen.getByRole('button', { name: 'Open editor' }))
    const save = screen.getByRole('button', { name: 'Save profile' })
    await user.click(save)
    expect(screen.getByRole('alertdialog', { name: 'Saved profile' })).toBeInTheDocument()
    await user.keyboard('{Escape}')
    await waitFor(() => expect(save).toHaveFocus())
    expect(screen.getByRole('dialog', { name: 'Edit profile' })).toBeInTheDocument()
    expect(screen.queryByRole('alertdialog')).not.toBeInTheDocument()
    expect(document.body).toHaveAttribute('data-scroll-locked')
  })
})

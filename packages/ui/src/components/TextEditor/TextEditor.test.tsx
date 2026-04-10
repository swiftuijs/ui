import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@/testing/render'
import { TextEditor } from './index'

describe('TextEditor', () => {
  it('keeps native uncontrolled textarea behavior and emits both change callbacks', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()
    const handleValueChange = vi.fn()

    render(
      <TextEditor
        aria-label="Message"
        defaultValue="Ada"
        onChange={handleChange}
        onValueChange={handleValueChange}
      />
    )

    const editor = screen.getByRole('textbox', { name: 'Message' })

    expect(editor).toHaveValue('Ada')

    await user.type(editor, ' Lovelace')

    expect(editor).toHaveValue('Ada Lovelace')
    expect(handleChange).toHaveBeenCalled()
    expect(handleValueChange).toHaveBeenLastCalledWith('Ada Lovelace')
  })

  it('sizes itself from the current content when rows are not provided', () => {
    render(
      <TextEditor
        aria-label="Notes"
        defaultValue={'One\nTwo\nThree\nFour'}
      />
    )

    expect(screen.getByRole('textbox', { name: 'Notes' })).toHaveAttribute('rows', '4')
  })

  it('keeps readOnly text stable', async () => {
    const user = userEvent.setup()

    render(
      <TextEditor
        aria-label="Locked note"
        defaultValue="Locked"
        readOnly
      />
    )

    const editor = screen.getByRole('textbox', { name: 'Locked note' })

    expect(editor).toHaveValue('Locked')
    expect(editor).toHaveAttribute('readOnly')

    await user.type(editor, ' text')

    expect(editor).toHaveValue('Locked')
  })

  it('recomputes its derived rows after a native form reset in uncontrolled mode', async () => {
    const user = userEvent.setup()
    const { container } = render(
      <form>
        <TextEditor
          aria-label="Resettable notes"
          defaultValue={'One\nTwo\nThree\nFour'}
        />
      </form>
    )

    const form = container.querySelector('form')!
    const editor = screen.getByRole('textbox', { name: 'Resettable notes' })

    expect(editor).toHaveAttribute('rows', '4')

    await user.clear(editor)
    await user.type(editor, 'Short')

    expect(editor).toHaveAttribute('rows', '3')

    form.reset()

    await waitFor(() => {
      expect(editor).toHaveValue('One\nTwo\nThree\nFour')
      expect(editor).toHaveAttribute('rows', '4')
    })
  })
})

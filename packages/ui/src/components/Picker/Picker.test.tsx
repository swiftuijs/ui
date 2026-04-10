import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { Picker } from './index'

type NativeOptionElement = globalThis.HTMLOptionElement

describe('Picker', () => {
  describe('primitive checklist', () => {
    it("submits the selected option's original value through native form data", () => {
      const { container } = render(
        <form>
          <Picker
            aria-label="Quantity"
            name="quantity"
            options={[
              { value: 'one', label: 'One' },
              { value: 'two', label: 'Two' },
            ]}
            selectedValue="two"
          />
        </form>
      )

      expect(new globalThis.FormData(container.querySelector('form')!).get('quantity')).toBe('two')
    })

    it('preserves callback value types when a numeric option is selected', async () => {
      const user = userEvent.setup()
      const handleValueChange = vi.fn()

      render(
        <Picker
          aria-label="Priority"
          options={[
            { value: 1, label: 'One' },
            { value: 2, label: 'Two' },
          ]}
          onValueChange={handleValueChange}
        />
      )

      await user.selectOptions(
        screen.getByRole('combobox', { name: 'Priority' }),
        screen.getByRole('option', { name: 'Two' })
      )

      expect(handleValueChange).toHaveBeenCalledWith(2)
    })

    it('keeps the controlled selection in sync when the parent clears back to no selection', () => {
      const { container, rerender } = render(
        <form>
          <Picker
            aria-label="Status"
            name="status"
            placeholder="Choose a status"
            options={[
              { value: 'ready', label: 'Ready' },
              { value: 'done', label: 'Done' },
            ]}
            selectedValue="ready"
          />
        </form>
      )

      rerender(
        <form>
          <Picker
            aria-label="Status"
            name="status"
            placeholder="Choose a status"
            options={[
              { value: 'ready', label: 'Ready' },
              { value: 'done', label: 'Done' },
            ]}
          />
        </form>
      )

      const select = screen.getByRole('combobox', { name: 'Status' })
      const placeholder = container.querySelector('option[hidden]') as NativeOptionElement

      expect(placeholder.selected).toBe(true)
      expect(select).toHaveValue('')
      expect(new globalThis.FormData(container.querySelector('form')!).get('status')).toBe('')
    })

    it('respects native form reset in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <form>
          <Picker
            aria-label="Status"
            name="status"
            placeholder="Choose a status"
            options={[
              { value: 'ready', label: 'Ready' },
              { value: 'done', label: 'Done' },
            ]}
          />
        </form>
      )

      const form = container.querySelector('form')!
      const select = screen.getByRole('combobox', { name: 'Status' })
      const placeholder = container.querySelector('option[hidden]') as NativeOptionElement

      await user.selectOptions(select, screen.getByRole('option', { name: 'Ready' }))
      expect(new globalThis.FormData(form).get('status')).toBe('ready')

      form.reset()

      expect(placeholder.selected).toBe(true)
      expect(select).toHaveValue('')
      expect(new globalThis.FormData(form).get('status')).toBe('')
    })

    it('preserves the selected option value when options are inserted in uncontrolled mode', async () => {
      const user = userEvent.setup()
      const { rerender } = render(
        <Picker
          aria-label="Priority"
          options={[
            { value: 'low', label: 'Low' },
            { value: 'high', label: 'High' },
          ]}
        />
      )

      const select = screen.getByRole('combobox', { name: 'Priority' })

      await user.selectOptions(select, screen.getByRole('option', { name: 'High' }))
      expect(select).toHaveValue('high')

      rerender(
        <Picker
          aria-label="Priority"
          options={[
            { value: 'urgent', label: 'Urgent' },
            { value: 'low', label: 'Low' },
            { value: 'high', label: 'High' },
          ]}
        />
      )

      expect(select).toHaveValue('high')
    })

    it('throws when option values collide after string coercion', () => {
      expect(() =>
        render(
          <Picker
            aria-label="Identifier"
            options={[
              { value: 1, label: 'Numeric One' },
              { value: '1', label: 'String One' },
            ]}
          />
        )
      ).toThrow(/unique after string coercion/i)
    })

    it('throws when an option uses the reserved empty string value', () => {
      expect(() =>
        render(
          <Picker
            aria-label="Status"
            options={[
              { value: '', label: 'Empty value' },
              { value: 'ready', label: 'Ready' },
            ]}
          />
        )
      ).toThrow(/empty string/i)
    })
  })
})

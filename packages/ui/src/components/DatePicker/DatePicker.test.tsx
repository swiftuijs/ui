import { describe, expect, it, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@/testing/render'
import { DatePicker } from './index'

describe('DatePicker', () => {
  describe('primitive checklist', () => {
    it('keeps native date input string values intact in controlled mode', () => {
      const handleChange = vi.fn()
      const handleValueChange = vi.fn()

      render(
        <DatePicker
          aria-label="Start date"
          value="2026-04-10"
          onChange={handleChange}
          onValueChange={handleValueChange}
        />
      )

      const input = screen.getByLabelText('Start date') as HTMLInputElement

      expect(input.tagName).toBe('INPUT')
      expect(input).toHaveAttribute('type', 'date')
      expect(input).toHaveValue('2026-04-10')

      fireEvent.change(input, { target: { value: '2026-05-01' } })

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleValueChange).toHaveBeenCalledWith('2026-05-01')
    })

    it('supports uncontrolled defaultValue and native form reset', async () => {
      const user = userEvent.setup()
      const { container } = render(
        <form>
          <DatePicker
            aria-label="Trip date"
            name="tripDate"
            defaultValue="2026-04-10"
          />
        </form>
      )

      const form = container.querySelector('form')!
      const input = screen.getByLabelText('Trip date') as HTMLInputElement

      expect(input).toHaveValue('2026-04-10')
      expect(new globalThis.FormData(form).get('tripDate')).toBe('2026-04-10')

      await user.clear(input)
      await user.type(input, '2026-04-18')

      expect(input).toHaveValue('2026-04-18')

      form.reset()

      await waitFor(() => {
        expect(input).toHaveValue('2026-04-10')
        expect(new globalThis.FormData(form).get('tripDate')).toBe('2026-04-10')
      })
    })

    it('maps mode and displayedComponents to native input types', () => {
      render(
        <>
          <DatePicker aria-label="Date" mode="date" />
          <DatePicker aria-label="Time" mode="time" />
          <DatePicker aria-label="Date and time" mode="dateAndTime" />
          <DatePicker
            aria-label="SwiftUI date and time"
            displayedComponents={['date', 'hourAndMinute']}
          />
        </>
      )

      expect(screen.getByLabelText('Date')).toHaveAttribute('type', 'date')
      expect(screen.getByLabelText('Time')).toHaveAttribute('type', 'time')
      expect(screen.getByLabelText('Date and time')).toHaveAttribute('type', 'datetime-local')
      expect(screen.getByLabelText('SwiftUI date and time')).toHaveAttribute('type', 'datetime-local')
    })

    it('forwards min, max, and disabled to the native input', async () => {
      const user = userEvent.setup()
      const handleValueChange = vi.fn()

      render(
        <DatePicker
          aria-label="Availability"
          defaultValue="2026-04-10"
          min="2026-04-01"
          max="2026-04-30"
          disabled
          onValueChange={handleValueChange}
        />
      )

      const input = screen.getByLabelText('Availability')

      expect(input).toBeDisabled()
      expect(input).toHaveAttribute('min', '2026-04-01')
      expect(input).toHaveAttribute('max', '2026-04-30')

      await user.click(input)

      expect(handleValueChange).not.toHaveBeenCalled()
    })
  })
})

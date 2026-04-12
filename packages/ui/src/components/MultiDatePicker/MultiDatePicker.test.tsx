import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { fireEvent, render, screen } from '@/testing/render'

import { MultiDatePicker } from './index'

describe('MultiDatePicker', () => {
  it('adds and removes selected dates in uncontrolled mode', async () => {
    const user = userEvent.setup()

    render(
      <MultiDatePicker
        label="Travel dates"
        defaultValue={['2026-04-10']}
      />,
    )

    const input = screen.getByLabelText('Travel dates') as HTMLInputElement

    expect(screen.getByText('2026-04-10')).toBeInTheDocument()

    fireEvent.change(input, { target: { value: '2026-04-12' } })

    expect(screen.getByText('2026-04-12')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Remove 2026-04-10' }))

    expect(screen.queryByText('2026-04-10')).not.toBeInTheDocument()
  })

  it('emits SwiftUI-style value updates in controlled mode', () => {
    const handleValueChange = vi.fn()

    render(
      <MultiDatePicker
        label="Selected dates"
        value={['2026-04-15']}
        onValueChange={handleValueChange}
      />,
    )

    const input = screen.getByLabelText('Selected dates')
    fireEvent.change(input, { target: { value: '2026-04-20' } })

    expect(handleValueChange).toHaveBeenCalledWith(['2026-04-15', '2026-04-20'])
  })

  it('serializes selected dates as repeated form values when name is provided', () => {
    const { container } = render(
      <form>
        <MultiDatePicker
          label="Conference dates"
          name="conferenceDates"
          defaultValue={['2026-05-01', '2026-05-03']}
        />
      </form>,
    )

    const form = container.querySelector('form')!
    const formData = new globalThis.FormData(form)

    expect(formData.getAll('conferenceDates')).toEqual(['2026-05-01', '2026-05-03'])
  })

  it('forwards minimumDate, maximumDate, and disabled to the native input', () => {
    render(
      <MultiDatePicker
        label="Blackout dates"
        minimumDate="2026-04-01"
        maximumDate="2026-04-30"
        disabled
      />,
    )

    const input = screen.getByLabelText('Blackout dates')

    expect(input).toBeDisabled()
    expect(input).toHaveAttribute('min', '2026-04-01')
    expect(input).toHaveAttribute('max', '2026-04-30')
  })
})

import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@/testing/render'
import { Stepper } from './index'

describe('Stepper', () => {
  describe('primitive checklist', () => {
    it('increments an uncontrolled value from defaultValue', () => {
      render(<Stepper defaultValue={2} />)

      expect(screen.getByText('2')).toBeInTheDocument()

      fireEvent.click(screen.getByRole('button', { name: /increment/i }))

      expect(screen.getByText('3')).toBeInTheDocument()
    })

    it('calls both change handlers with the next controlled value', () => {
      const onChange = vi.fn()
      const onValueChange = vi.fn()

      render(
        <Stepper
          value={5}
          onChange={onChange}
          onValueChange={onValueChange}
        />
      )

      fireEvent.click(screen.getByRole('button', { name: /increment/i }))

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenCalledWith(6)
      expect(onValueChange).toHaveBeenCalledTimes(1)
      expect(onValueChange).toHaveBeenCalledWith(6)
      expect(screen.getByText('5')).toBeInTheDocument()
    })

    it('disables increment and decrement buttons at the value bounds', () => {
      render(<Stepper defaultValue={0} min={0} max={1} />)

      expect(screen.getByRole('button', { name: /decrement/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /increment/i })).not.toBeDisabled()

      fireEvent.click(screen.getByRole('button', { name: /increment/i }))

      expect(screen.getByText('1')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /increment/i })).toBeDisabled()
    })

    it('keeps both buttons disabled when the stepper is disabled', () => {
      const onChange = vi.fn()

      render(
        <Stepper
          defaultValue={3}
          disabled
          onChange={onChange}
        />
      )

      expect(screen.getByRole('button', { name: /decrement/i })).toBeDisabled()
      expect(screen.getByRole('button', { name: /increment/i })).toBeDisabled()

      fireEvent.click(screen.getByRole('button', { name: /increment/i }))

      expect(onChange).not.toHaveBeenCalled()
      expect(screen.getByText('3')).toBeInTheDocument()
    })
  })
})

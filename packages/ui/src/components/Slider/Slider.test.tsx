import { describe, expect, it, vi } from 'vitest'
import { fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { Slider } from './index'

describe('Slider', () => {
  describe('primitive checklist', () => {
    it('renders a native range input with accessible slider semantics', () => {
      render(
        <Slider
          aria-label="Volume"
          value={25}
          onValueChange={() => {}}
          min={0}
          max={100}
          step={5}
        />
      )

      const slider = screen.getByRole('slider', { name: 'Volume' })

      expect(slider.tagName).toBe('INPUT')
      expect(slider).toHaveAttribute('type', 'range')
      expect(slider).toHaveAttribute('min', '0')
      expect(slider).toHaveAttribute('max', '100')
      expect(slider).toHaveAttribute('step', '5')
      expect((slider as HTMLInputElement).value).toBe('25')
    })

    it('supports uncontrolled defaultValue and native form submission', () => {
      const { container } = render(
        <form>
          <Slider
            aria-label="Brightness"
            name="brightness"
            defaultValue={30}
          />
        </form>
      )

      const form = container.querySelector('form')!
      const slider = screen.getByRole('slider', { name: 'Brightness' }) as HTMLInputElement

      expect(slider.value).toBe('30')
      expect(new globalThis.FormData(form).get('brightness')).toBe('30')

      fireEvent.change(slider, { target: { value: '70' } })
      expect(slider.value).toBe('70')

      form.reset()

      expect(slider.value).toBe('30')
      expect(new globalThis.FormData(form).get('brightness')).toBe('30')
    })

    it('forwards disabled to the native range input', async () => {
      const user = userEvent.setup()
      const handleValueChange = vi.fn()

      render(
        <Slider
          aria-label="Disabled"
          defaultValue={30}
          disabled
          onValueChange={handleValueChange}
        />
      )

      const slider = screen.getByRole('slider', { name: 'Disabled' })

      expect(slider).toBeDisabled()

      await user.click(slider)

      expect(handleValueChange).not.toHaveBeenCalled()
      expect((slider as HTMLInputElement).value).toBe('30')
    })

    it('forwards native change events and emits numeric value changes', () => {
      const handleChange = vi.fn()
      const handleValueChange = vi.fn()

      render(
        <Slider
          aria-label="Opacity"
          value={10}
          onChange={handleChange}
          onValueChange={handleValueChange}
        />
      )

      const slider = screen.getByRole('slider', { name: 'Opacity' })

      fireEvent.change(slider, { target: { value: '42' } })

      expect(handleChange).toHaveBeenCalledTimes(1)
      expect(handleValueChange).toHaveBeenCalledWith(42)
    })
  })
})

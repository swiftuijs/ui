import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { SecureField } from './index'

describe('SecureField', () => {
  describe('primitive checklist', () => {
    it('renders a password input and preserves textfield semantics', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <SecureField
          aria-label="Password"
          placeholder="Enter password"
          defaultValue="secret"
          onChange={handleChange}
        />
      )

      const input = screen.getByLabelText('Password') as HTMLInputElement

      expect(input).toHaveAttribute('type', 'password')
      expect(input).toHaveAttribute('placeholder', 'Enter password')
      expect(input).toHaveValue('secret')

      await user.type(input, '123')

      expect(input).toHaveValue('secret123')
      expect(handleChange).toHaveBeenCalled()
    })

    it('forwards disabled to the native control', () => {
      render(
        <SecureField
          aria-label="Disabled password"
          disabled
        />
      )

      expect(screen.getByLabelText('Disabled password')).toBeDisabled()
    })
  })
})

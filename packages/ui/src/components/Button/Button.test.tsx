import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { Button } from './index'

describe('Button', () => {
  describe('primitive checklist', () => {
    it('renders a semantic button with an accessible name', () => {
      render(<Button>Save changes</Button>)

      const button = screen.getByRole('button', { name: 'Save changes' })

      expect(button.tagName).toBe('BUTTON')
      expect(button).toHaveAttribute('type', 'button')
    })

    it('composes user className and style with primitive defaults', () => {
      render(
        <Button className="custom-class" style={{ marginTop: '4px' }}>
          Styled button
        </Button>
      )

      const button = screen.getByRole('button', { name: 'Styled button' })

      expect(button).toHaveClass('sw-button', 'custom-class')
      expect(button).toHaveStyle({ marginTop: '4px' })
    })

    it('preserves disabled native button behavior', async () => {
      const user = userEvent.setup()
      const handleClick = vi.fn()

      render(
        <Button disabled onClick={handleClick}>
          Disabled action
        </Button>
      )

      const button = screen.getByRole('button', { name: 'Disabled action' })

      expect(button).toBeDisabled()

      await user.click(button)

      expect(handleClick).not.toHaveBeenCalled()
    })

    it('lets callers override controlled button props when needed', () => {
      render(
        <Button aria-pressed type="submit">
          Submit form
        </Button>
      )

      const button = screen.getByRole('button', { name: 'Submit form' })

      expect(button).toHaveAttribute('type', 'submit')
      expect(button).toHaveAttribute('aria-pressed', 'true')
    })
  })
})

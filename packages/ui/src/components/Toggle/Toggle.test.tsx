import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { Toggle } from './index'

describe('Toggle', () => {
  describe('primitive checklist', () => {
    it('uses native switch semantics for click and keyboard interaction', async () => {
      const user = userEvent.setup()
      const handleChange = vi.fn()

      render(
        <Toggle
          isOn={false}
          onChange={handleChange}
          aria-label="Notifications"
        />
      )

      const toggle = screen.getByRole('switch', { name: 'Notifications' })

      expect(toggle.tagName).toBe('INPUT')
      expect(toggle).toHaveAttribute('type', 'checkbox')
      expect(toggle).not.toBeChecked()

      await user.click(toggle)
      expect(handleChange).toHaveBeenCalledWith(true)
    })

    it('participates in native form submission with forwarded input props', () => {
      const { container } = render(
        <form>
          <Toggle
            aria-label="Notifications"
            isOn
            onChange={() => {}}
            name="notifications"
            value="enabled"
          />
        </form>
      )

      expect(new globalThis.FormData(container.querySelector('form')!).get('notifications')).toBe('enabled')
    })
  })
})

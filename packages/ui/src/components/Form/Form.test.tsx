import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@/testing/render'
import { Form } from './index'

describe('Form', () => {
  describe('primitive checklist', () => {
    it('preserves native submit behavior', async () => {
      const handleSubmit = vi.fn((event: React.FormEvent<HTMLFormElement>) => {
        expect(event.defaultPrevented).toBe(false)
      })

      const { container } = render(
        <Form onSubmit={handleSubmit}>
          <button type="submit">Save</button>
        </Form>
      )

      expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()

      fireEvent.submit(container.querySelector('form')!)

      expect(handleSubmit).toHaveBeenCalledTimes(1)
    })

    it('forwards native form attributes', () => {
      const { container } = render(
        <Form action="/submit" method="post" target="_blank">
          <button type="submit">Save</button>
        </Form>
      )

      const form = container.querySelector('form')!

      expect(form).toHaveAttribute('action', '/submit')
      expect(form).toHaveAttribute('method', 'post')
      expect(form).toHaveAttribute('target', '_blank')
    })
  })
})

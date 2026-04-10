import { describe, expect, it } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { TextField } from './index'

describe('TextField', () => {
  describe('primitive checklist', () => {
    it('keeps native uncontrolled input behavior', async () => {
      const user = userEvent.setup()
      render(
        <TextField aria-label="Name" defaultValue="Ada" />
      )

      const input = screen.getByRole('textbox', { name: 'Name' })

      expect(input).toHaveValue('Ada')

      await user.type(input, ' Lovelace')
      expect(input).toHaveValue('Ada Lovelace')
    })
  })
})

import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Button } from '../Button'
import { ControlGroup } from './index'

describe('ControlGroup', () => {
  it('renders an accessible group with its label', () => {
    render(
      <ControlGroup label="Formatting">
        <Button>Bold</Button>
        <Button>Italic</Button>
      </ControlGroup>,
    )

    const group = screen.getByRole('group', { name: 'Formatting' })

    expect(group).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Bold' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Italic' })).toBeInTheDocument()
  })
})

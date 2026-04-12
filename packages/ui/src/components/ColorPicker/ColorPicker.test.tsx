import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '@/testing/render'

import { ColorPicker } from './index'

describe('ColorPicker', () => {
  it('renders a labeled color input and emits value changes', () => {
    const onChange = vi.fn()

    render(
      <ColorPicker
        label="Accent"
        value="#ff0000"
        onChange={onChange}
      />,
    )

    const input = screen.getByLabelText('Accent')
    fireEvent.change(input, { target: { value: '#00ff00' } })

    expect(onChange).toHaveBeenCalledWith('#00ff00')
  })
})

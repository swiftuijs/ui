import { describe, expect, it } from 'vitest'

import { render } from '@/testing/render'

import { Ellipse } from './index'

describe('Ellipse', () => {
  it('renders an ellipse surface with fill and stroke styles', () => {
    const { container } = render(
      <Ellipse fill="#34c759" stroke="#1f2937" strokeWidth={3} style={{ height: 80, width: 140 }} />
    )

    const ellipse = container.firstElementChild as HTMLElement

    expect(ellipse).toHaveStyle({
      backgroundColor: 'rgb(52, 199, 89)',
      borderColor: 'rgb(31, 41, 55)',
      borderWidth: '3px',
      borderStyle: 'solid',
      height: '80px',
      width: '140px',
    })
  })
})

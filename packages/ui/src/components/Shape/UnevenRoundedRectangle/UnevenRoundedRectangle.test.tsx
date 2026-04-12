import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { UnevenRoundedRectangle } from '.'

describe('UnevenRoundedRectangle', () => {
  it('applies independent corner radii through CSS custom properties', () => {
    render(
      <UnevenRoundedRectangle
        aria-label="Ticket shape"
        cornerRadii={{
          topLeading: 24,
          topTrailing: 8,
          bottomLeading: 12,
          bottomTrailing: 32,
        }}
        fill="#0a84ff"
        style={{ width: '160px', height: '96px' }}
      />,
    )

    const shape = screen.getByLabelText('Ticket shape')

    expect(shape).toHaveStyle({
      '--sw-shape-top-leading-radius': '24px',
      '--sw-shape-top-trailing-radius': '8px',
      '--sw-shape-bottom-leading-radius': '12px',
      '--sw-shape-bottom-trailing-radius': '32px',
      backgroundColor: 'rgb(10, 132, 255)',
    })
  })
})

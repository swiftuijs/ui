import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { AspectRatio } from './index'

describe('AspectRatio', () => {
  it('applies a numeric aspect ratio and fit mode metadata', () => {
    render(
      <AspectRatio ratio={1.5}>
        <div>Preview</div>
      </AspectRatio>,
    )

    const wrapper = screen.getByText('Preview').closest('.sw-aspectratio')
    expect(wrapper).toHaveAttribute('data-content-mode', 'fit')
    expect(wrapper).toHaveStyle({ aspectRatio: '1.5' })
  })

  it('normalizes tuple ratios', () => {
    render(
      <AspectRatio ratio={[16, 9]} contentMode="fill">
        <div>Poster</div>
      </AspectRatio>,
    )

    const wrapper = screen.getByText('Poster').closest('.sw-aspectratio')
    expect(wrapper).toHaveAttribute('data-content-mode', 'fill')
    expect(wrapper).toHaveAttribute('data-ratio', String(16 / 9))
  })
})

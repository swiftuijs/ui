import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { VisualEffect } from './index'

describe('VisualEffect', () => {
  it('wraps content with visual effect metadata', () => {
    render(
      <VisualEffect effect="prominent" shape="rounded">
        <span>Inspector summary</span>
      </VisualEffect>
    )

    const wrapper = screen.getByText('Inspector summary').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-effect', 'prominent')
    expect(wrapper).toHaveAttribute('data-shape', 'rounded')
    expect(wrapper).toHaveClass('sw-visualeffect')
    expect(wrapper).toHaveClass('sw-visualeffect-prominent')
  })
})

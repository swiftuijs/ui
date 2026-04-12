import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { PresentationCompactAdaptation } from './index'

describe('PresentationCompactAdaptation', () => {
  it('annotates wrapped content with compact adaptation metadata', () => {
    render(
      <PresentationCompactAdaptation adaptation="popover">
        <span>Compact fallback</span>
      </PresentationCompactAdaptation>
    )

    const wrapper = screen.getByText('Compact fallback').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-presentation-compact-adaptation', 'popover')
    expect(wrapper).toHaveClass('sw-presentationcompactadaptation')
    expect(wrapper).toHaveClass('sw-presentationcompactadaptation-popover')
  })
})

import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ScrollIndicators } from './index'

describe('ScrollIndicators', () => {
  it('annotates wrapped content with indicator visibility metadata', () => {
    render(
      <ScrollIndicators visibility="hidden" axes="horizontal">
        <span>Gallery strip</span>
      </ScrollIndicators>
    )

    const wrapper = screen.getByText('Gallery strip').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-scroll-indicators-visibility', 'hidden')
    expect(wrapper).toHaveAttribute('data-scroll-indicators-axes', 'horizontal')
    expect(wrapper).toHaveClass('sw-scrollindicators')
    expect(wrapper).toHaveClass('sw-scrollindicators-hidden')
    expect(wrapper).toHaveClass('sw-scrollindicators-horizontal')
  })
})

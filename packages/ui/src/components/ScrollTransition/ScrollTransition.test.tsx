import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ScrollTransition } from './index'

describe('ScrollTransition', () => {
  it('wraps content with scroll transition metadata', () => {
    render(
      <ScrollTransition transition="scale" phase="topLeading" axis="vertical">
        <span>Headline</span>
      </ScrollTransition>
    )

    const wrapper = screen.getByText('Headline').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-transition', 'scale')
    expect(wrapper).toHaveAttribute('data-phase', 'topLeading')
    expect(wrapper).toHaveAttribute('data-axis', 'vertical')
    expect(wrapper).toHaveClass('sw-scrolltransition')
    expect(wrapper).toHaveClass('sw-scrolltransition-scale')
  })
})

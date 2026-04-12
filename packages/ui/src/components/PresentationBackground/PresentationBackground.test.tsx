import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { PresentationBackground } from './index'

describe('PresentationBackground', () => {
  it('annotates wrapped content with presentation background metadata', () => {
    render(
      <PresentationBackground backgroundStyle="thinMaterial" shape="capsule">
        <span>Sheet surface</span>
      </PresentationBackground>
    )

    const wrapper = screen.getByText('Sheet surface').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-presentation-background-style', 'thinMaterial')
    expect(wrapper).toHaveAttribute('data-presentation-background-shape', 'capsule')
    expect(wrapper).toHaveClass('sw-presentationbackground')
    expect(wrapper).toHaveClass('sw-presentationbackground-thinMaterial')
    expect(wrapper).toHaveClass('sw-presentationbackground-shape-capsule')
  })
})

import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ScrollBounceBehavior } from './index'

describe('ScrollBounceBehavior', () => {
  it('annotates wrapped content with bounce behavior metadata', () => {
    render(
      <ScrollBounceBehavior behavior="basedOnSize" axes="all">
        <span>Adaptive list</span>
      </ScrollBounceBehavior>
    )

    const wrapper = screen.getByText('Adaptive list').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-scroll-bounce-behavior', 'basedOnSize')
    expect(wrapper).toHaveAttribute('data-scroll-bounce-axes', 'all')
    expect(wrapper).toHaveClass('sw-scrollbouncebehavior')
    expect(wrapper).toHaveClass('sw-scrollbouncebehavior-basedOnSize')
    expect(wrapper).toHaveClass('sw-scrollbouncebehavior-all')
  })
})

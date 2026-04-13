import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { DefaultScrollAnchor } from './index'

describe('DefaultScrollAnchor', () => {
  it('annotates wrapped content with default scroll anchor metadata', () => {
    render(
      <DefaultScrollAnchor anchor="center">
        <span>Anchored feed</span>
      </DefaultScrollAnchor>
    )

    const wrapper = screen.getByText('Anchored feed').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-default-scroll-anchor', 'center')
    expect(wrapper).toHaveClass('sw-defaultscrollanchor')
    expect(wrapper).toHaveClass('sw-defaultscrollanchor-center')
  })
})

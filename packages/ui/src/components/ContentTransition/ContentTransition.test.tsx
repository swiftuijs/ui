import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ContentTransition } from './index'

describe('ContentTransition', () => {
  it('wraps content with transition metadata', () => {
    render(
      <ContentTransition transition="opacity">
        <span>Status updated</span>
      </ContentTransition>
    )

    const wrapper = screen.getByText('Status updated').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-transition', 'opacity')
    expect(wrapper).toHaveClass('sw-contenttransition')
  })
})

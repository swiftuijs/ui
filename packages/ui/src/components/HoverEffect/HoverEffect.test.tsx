import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { HoverEffect } from './index'

describe('HoverEffect', () => {
  it('wraps content with effect metadata', () => {
    render(
      <HoverEffect effect="lift">
        <button type="button">Favorite</button>
      </HoverEffect>
    )

    const wrapper = screen.getByRole('button', { name: 'Favorite' }).parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-effect', 'lift')
    expect(wrapper).toHaveClass('sw-hovereffect')
  })
})

import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { SymbolEffect } from './index'

describe('SymbolEffect', () => {
  it('applies an active effect wrapper around symbol content', () => {
    render(
      <SymbolEffect effect="pulse" isActive>
        <span aria-label="Favorite symbol">★</span>
      </SymbolEffect>
    )

    const wrapper = screen.getByLabelText('Favorite symbol').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-effect', 'pulse')
    expect(wrapper).toHaveAttribute('data-active', 'true')
  })
})

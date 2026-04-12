import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { MatchedGeometryEffect } from './index'

describe('MatchedGeometryEffect', () => {
  it('wraps content with matched geometry metadata', () => {
    render(
      <MatchedGeometryEffect id="card" namespace="library" role="source" properties="frame">
        <button type="button">Inspect</button>
      </MatchedGeometryEffect>
    )

    const wrapper = screen.getByRole('button', { name: 'Inspect' }).parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-geometry-id', 'card')
    expect(wrapper).toHaveAttribute('data-geometry-namespace', 'library')
    expect(wrapper).toHaveAttribute('data-geometry-role', 'source')
    expect(wrapper).toHaveAttribute('data-geometry-properties', 'frame')
    expect(wrapper).toHaveClass('sw-matchedgeometryeffect')
  })
})

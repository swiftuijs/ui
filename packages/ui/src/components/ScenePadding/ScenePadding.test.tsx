import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ScenePadding } from './index'

describe('ScenePadding', () => {
  it('wraps content with scene padding metadata', () => {
    render(
      <ScenePadding edges={['top', 'horizontal']} size="compact">
        <span>Inset content</span>
      </ScenePadding>
    )

    const wrapper = screen.getByText('Inset content').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-scene-padding-size', 'compact')
    expect(wrapper).toHaveAttribute('data-scene-padding-edges', 'top,horizontal')
    expect(wrapper).toHaveClass('sw-scenepadding')
    expect(wrapper).toHaveClass('sw-scenepadding-compact')
  })
})

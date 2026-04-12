import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { PresentationDragIndicator } from './index'

describe('PresentationDragIndicator', () => {
  it('annotates wrapped content with drag-indicator visibility metadata', () => {
    render(
      <PresentationDragIndicator visibility="hidden">
        <span>Modal content</span>
      </PresentationDragIndicator>
    )

    const wrapper = screen.getByText('Modal content').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-presentation-drag-indicator', 'hidden')
    expect(wrapper).toHaveClass('sw-presentationdragindicator')
    expect(wrapper).toHaveClass('sw-presentationdragindicator-hidden')
  })
})

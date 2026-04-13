import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ScrollClipDisabled } from './index'

describe('ScrollClipDisabled', () => {
  it('annotates wrapped content with scroll clip metadata', () => {
    render(
      <ScrollClipDisabled disabled>
        <span>Bleeding carousel</span>
      </ScrollClipDisabled>
    )

    const wrapper = screen.getByText('Bleeding carousel').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-scroll-clip-disabled', 'true')
    expect(wrapper).toHaveClass('sw-scrollclipdisabled')
    expect(wrapper).toHaveClass('sw-scrollclipdisabled-disabled')
  })
})

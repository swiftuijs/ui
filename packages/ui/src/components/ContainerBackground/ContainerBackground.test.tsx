import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ContainerBackground } from './index'

describe('ContainerBackground', () => {
  it('annotates wrapped content with container placement metadata', () => {
    render(
      <ContainerBackground placement="navigation" emphasis="secondary">
        <span>Navigation chrome</span>
      </ContainerBackground>
    )

    const wrapper = screen.getByText('Navigation chrome').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-container-background-placement', 'navigation')
    expect(wrapper).toHaveAttribute('data-container-background-emphasis', 'secondary')
    expect(wrapper).toHaveClass('sw-containerbackground')
    expect(wrapper).toHaveClass('sw-containerbackground-secondary')
  })
})

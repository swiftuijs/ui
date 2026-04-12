import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { PresentationCornerRadius } from './index'

describe('PresentationCornerRadius', () => {
  it('exposes the configured corner radius as wrapper metadata and css variable', () => {
    render(
      <PresentationCornerRadius radius={28}>
        <span>Detented sheet</span>
      </PresentationCornerRadius>
    )

    const wrapper = screen.getByText('Detented sheet').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-presentation-corner-radius', '28')
    expect(wrapper).toHaveClass('sw-presentationcornerradius')
    expect(wrapper.style.getPropertyValue('--sw-presentation-corner-radius')).toBe('28px')
  })
})

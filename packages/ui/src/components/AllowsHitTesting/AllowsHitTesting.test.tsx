import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { AllowsHitTesting } from './index'

describe('AllowsHitTesting', () => {
  it('disables pointer interaction metadata when hit testing is turned off', () => {
    render(
      <AllowsHitTesting enabled={false}>
        <button type="button">Overlay action</button>
      </AllowsHitTesting>
    )

    const wrapper = screen.getByRole('button', { name: 'Overlay action' }).parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-hit-testing', 'false')
    expect(wrapper).toHaveClass('sw-allowshittesting')
    expect(wrapper).toHaveClass('sw-allowshittesting-disabled')
    expect(wrapper).toHaveStyle({ pointerEvents: 'none' })
  })
})

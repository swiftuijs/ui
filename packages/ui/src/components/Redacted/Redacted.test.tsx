import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Redacted } from './index'

describe('Redacted', () => {
  it('marks content as redacted when active', () => {
    render(
      <Redacted reason="placeholder">
        <span>Loading profile</span>
      </Redacted>
    )

    const wrapper = screen.getByText('Loading profile').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-redaction-reason', 'placeholder')
    expect(wrapper).toHaveAttribute('data-redacted', 'true')
    expect(wrapper).toHaveClass('sw-redacted')
  })

  it('passes through content when inactive', () => {
    render(
      <Redacted active={false}>
        <span>Loaded profile</span>
      </Redacted>
    )

    const wrapper = screen.getByText('Loaded profile').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-redacted', 'false')
    expect(wrapper).not.toHaveClass('sw-redacted-active')
  })
})

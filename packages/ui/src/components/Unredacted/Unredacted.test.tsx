import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Unredacted } from './index'

describe('Unredacted', () => {
  it('marks content as explicitly unredacted', () => {
    render(
      <Unredacted>
        <span>Ready content</span>
      </Unredacted>
    )

    const wrapper = screen.getByText('Ready content').parentElement as HTMLElement

    expect(wrapper).toHaveAttribute('data-redacted', 'false')
    expect(wrapper).toHaveAttribute('data-unredacted', 'true')
    expect(wrapper).toHaveClass('sw-unredacted')
  })
})

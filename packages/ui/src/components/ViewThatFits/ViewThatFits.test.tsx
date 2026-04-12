import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { ViewThatFits } from './index'

describe('ViewThatFits', () => {
  it('renders the first matching child for the provided width', () => {
    render(
      <ViewThatFits width={320}>
        <div data-min-width={480}>Wide layout</div>
        <div data-min-width={300}>Compact layout</div>
        <div>Fallback layout</div>
      </ViewThatFits>,
    )

    expect(screen.getByText('Compact layout')).toBeInTheDocument()
    expect(screen.queryByText('Wide layout')).not.toBeInTheDocument()
  })

  it('renders the last child as a fallback when no width constraint matches', () => {
    render(
      <ViewThatFits width={220}>
        <div data-min-width={480}>Wide layout</div>
        <div data-min-width={300}>Compact layout</div>
        <div>Fallback layout</div>
      </ViewThatFits>,
    )

    expect(screen.getByText('Fallback layout')).toBeInTheDocument()
  })
})

import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { LinearGradient } from './index'

describe('LinearGradient', () => {
  it('renders a linear-gradient background from the provided stops', () => {
    const { container } = render(
      <LinearGradient
        endPoint="bottomTrailing"
        startPoint="topLeading"
        stops={[
          { color: '#ff0000', location: 0 },
          { color: '#0000ff', location: 1 },
        ]}
      />,
    )

    const view = container.firstChild as HTMLElement
    expect(view.style.backgroundImage).toContain('linear-gradient')
    expect(view.style.backgroundImage).toContain('rgb(255, 0, 0)')
    expect(view.style.backgroundImage).toContain('rgb(0, 0, 255)')
  })
})

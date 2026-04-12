import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { RadialGradient } from './index'

describe('RadialGradient', () => {
  it('renders a radial-gradient background from the provided stops', () => {
    const { container } = render(
      <RadialGradient
        center="center"
        endRadius={90}
        startRadius={12}
        stops={[
          { color: '#34c759', location: 0 },
          { color: '#0a84ff', location: 1 },
        ]}
      />,
    )

    const view = container.firstChild as HTMLElement
    expect(view.style.backgroundImage).toContain('radial-gradient')
    expect(view.style.backgroundImage).toContain('rgb(52, 199, 89)')
    expect(view.style.backgroundImage).toContain('rgb(10, 132, 255)')
  })
})

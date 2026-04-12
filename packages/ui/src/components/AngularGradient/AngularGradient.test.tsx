import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'

import { AngularGradient } from './index'

describe('AngularGradient', () => {
  it('renders a conic gradient background from the provided stops', () => {
    const { container } = render(
      <AngularGradient
        center="center"
        endAngle={360}
        startAngle={0}
        stops={[
          { color: '#ff9f0a', location: 0 },
          { color: '#bf5af2', location: 1 },
        ]}
      />,
    )

    const view = container.firstChild as HTMLElement
    expect(view.style.backgroundImage).toContain('conic-gradient')
    expect(view.style.backgroundImage).toContain('rgb(255, 159, 10)')
    expect(view.style.backgroundImage).toContain('rgb(191, 90, 242)')
  })
})

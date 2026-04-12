import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { MeshGradient } from '.'

describe('MeshGradient', () => {
  it('renders a gradient surface from point/color pairs', () => {
    render(
      <MeshGradient
        aria-label="Mesh gradient"
        colors={['#ff375f', '#5e5ce6', '#30d158']}
        height={180}
        points={[
          [0.15, 0.2],
          [0.75, 0.3],
          [0.45, 0.8],
        ]}
        width={320}
      />,
    )

    const mesh = screen.getByLabelText('Mesh gradient')

    expect(mesh).toHaveStyle({ width: '320px', height: '180px' })
    expect(mesh.getAttribute('style')).toContain('radial-gradient')
    expect(mesh.getAttribute('style')).toContain('rgb(255, 55, 95)')
  })
})

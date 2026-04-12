import { describe, expect, it } from 'vitest'

import { render } from '@/testing/render'

import { Capsule } from './index'

describe('Capsule', () => {
  it('renders a pill-shaped surface with fill and stroke styles', () => {
    const { container } = render(
      <Capsule fill="#007aff" stroke="#111827" strokeWidth={2} style={{ height: 40, width: 120 }} />
    )

    const capsule = container.firstElementChild as HTMLElement

    expect(capsule).toHaveStyle({
      backgroundColor: 'rgb(0, 122, 255)',
      borderColor: 'rgb(17, 24, 39)',
      borderWidth: '2px',
      borderStyle: 'solid',
      height: '40px',
      width: '120px',
    })
  })
})

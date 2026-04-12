import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContainerRelativeFrame } from './index'

describe('ContainerRelativeFrame', () => {
  it('computes horizontal frame size from count, span, and spacing', () => {
    render(
      <ContainerRelativeFrame count={3} span={2} spacing={12}>
        <div>Pane</div>
      </ContainerRelativeFrame>,
    )

    const wrapper = screen.getByText('Pane').closest('.sw-container-relative-frame')
    expect(wrapper).toHaveStyle({
      width: 'calc((100% - 24px) * 2 / 3 + 12px)',
      maxWidth: 'calc((100% - 24px) * 2 / 3 + 12px)',
    })
  })

  it('supports explicit vertical lengths', () => {
    render(
      <ContainerRelativeFrame axis="vertical" length={240}>
        <div>Tall</div>
      </ContainerRelativeFrame>,
    )

    const wrapper = screen.getByText('Tall').closest('.sw-container-relative-frame')
    expect(wrapper).toHaveStyle({
      height: '240px',
      maxHeight: '240px',
    })
  })
})

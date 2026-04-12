import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ContentMargins } from './index'

describe('ContentMargins', () => {
  it('applies regular all-edge content padding by default', () => {
    render(
      <ContentMargins>
        <div>Body</div>
      </ContentMargins>,
    )

    const wrapper = screen.getByText('Body').closest('.sw-content-margins')
    expect(wrapper).toHaveStyle({ padding: '1rem' })
  })

  it('applies explicit edge values', () => {
    render(
      <ContentMargins edges={['top', 'horizontal']} value="compact">
        <div>Inset</div>
      </ContentMargins>,
    )

    const wrapper = screen.getByText('Inset').closest('.sw-content-margins')
    expect(wrapper).toHaveStyle({
      paddingTop: '0.5rem',
      paddingInline: '0.5rem',
    })
  })
})

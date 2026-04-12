import { render, screen } from '@/testing/render'
import { describe, expect, it } from 'vitest'

import { ScrollTarget } from './index'

describe('ScrollTarget', () => {
  it('marks the wrapped content with a stable scroll identifier', () => {
    render(
      <ScrollTarget scrollId="chapter-2">
        <div>Chapter 2</div>
      </ScrollTarget>,
    )

    expect(screen.getByText('Chapter 2').parentElement).toHaveAttribute('data-sw-scroll-id', 'chapter-2')
  })
})

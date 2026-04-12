import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { Button } from '../Button'
import { ScrollTarget } from '../ScrollTarget'
import { ScrollViewReader } from './index'

describe('ScrollViewReader', () => {
  it('exposes a proxy that scrolls to marked targets', async () => {
    const user = userEvent.setup()
    const scrollIntoView = vi.fn()
    Object.defineProperty(globalThis.HTMLElement.prototype, 'scrollIntoView', {
      configurable: true,
      value: scrollIntoView,
      writable: true,
    })

    render(
      <ScrollViewReader>
        {(proxy) => (
          <>
            <Button onClick={() => proxy.scrollTo('details')}>Jump to details</Button>
            <ScrollTarget scrollId="summary">
              <div>Summary</div>
            </ScrollTarget>
            <ScrollTarget scrollId="details">
              <div>Details</div>
            </ScrollTarget>
          </>
        )}
      </ScrollViewReader>,
    )

    await user.click(screen.getByRole('button', { name: 'Jump to details' }))

    expect(scrollIntoView).toHaveBeenCalledTimes(1)
    expect(screen.getByText('Details').parentElement).toHaveAttribute('data-sw-scroll-id', 'details')
  })
})

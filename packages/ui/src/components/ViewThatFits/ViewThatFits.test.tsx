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

it('selects a compact variant after container measurement and cleans up observation', async () => {
  const { act } = await import('@testing-library/react')
  const { vi } = await import('vitest')
  let resize: (entries: { contentRect: { width: number } }[]) => void = () => {}
  const disconnect = vi.fn()
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: typeof resize) { resize = callback }
    observe() {}
    disconnect = disconnect
  })
  try {
    const { unmount } = render(<ViewThatFits><div data-min-width={500}>Full toolbar</div><div>Compact toolbar</div></ViewThatFits>)
    expect(screen.getByText('Full toolbar')).toBeInTheDocument()
    act(() => resize([{ contentRect: { width: 320 } }]))
    expect(screen.getByText('Compact toolbar')).toBeInTheDocument()
    act(() => resize([{ contentRect: { width: 600 } }]))
    expect(screen.getByText('Full toolbar')).toBeInTheDocument()
    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  } finally { vi.unstubAllGlobals() }
})

it('handles empty variants and falls back past invalid width hints', () => {
  const { rerender, container } = render(<ViewThatFits />)
  expect(container.firstElementChild).toBeEmptyDOMElement()
  rerender(<ViewThatFits width={300}>{false}<div data-min-width="invalid">Unavailable</div><div>Fallback</div></ViewThatFits>)
  expect(screen.getByText('Fallback')).toBeInTheDocument()
})

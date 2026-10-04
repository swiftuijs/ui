import { act, fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { useViewport } from './viewport'
import { useSizeClass, useHorizontalSizeClass, useVerticalSizeClass } from './size-class'

function Probe() {
  const viewport = useViewport()
  const sizeClass = useSizeClass()
  return <output>{viewport ? `${viewport.width}:${sizeClass?.horizontal}` : 'unknown'}</output>
}

describe('viewport subscriptions and hydration', () => {
  it('only re-renders an axis subscriber when its own breakpoint changes', () => {
    const horizontalRendered = vi.fn()
    const verticalRendered = vi.fn()
    function Horizontal() { const axis = useHorizontalSizeClass(); horizontalRendered(); return <output>{axis}</output> }
    function Vertical() { const axis = useVerticalSizeClass(); verticalRendered(); return <output>{axis}</output> }
    vi.stubGlobal('innerWidth', 1200)
    vi.stubGlobal('innerHeight', 800)
    const { unmount } = render(<><Horizontal /><Vertical /></>)
    try {
      horizontalRendered.mockClear(); verticalRendered.mockClear()
      vi.stubGlobal('innerWidth', 1210)
      fireEvent(window, new globalThis.Event('resize'))
      expect(horizontalRendered).not.toHaveBeenCalled()
      expect(verticalRendered).not.toHaveBeenCalled()
      vi.stubGlobal('innerWidth', 390)
      fireEvent(window, new globalThis.Event('resize'))
      expect(horizontalRendered).toHaveBeenCalledOnce()
      expect(verticalRendered).not.toHaveBeenCalled()
      horizontalRendered.mockClear()
      vi.stubGlobal('innerHeight', 390)
      fireEvent(window, new globalThis.Event('resize'))
      expect(horizontalRendered).not.toHaveBeenCalled()
      expect(verticalRendered).toHaveBeenCalledOnce()
    } finally { unmount(); vi.unstubAllGlobals() }
  })

  it('hydrates axis subscribers with a null server snapshot', async () => {
    function AxisProbe() { return <output>{`${useHorizontalSizeClass()}:${useVerticalSizeClass()}`}</output> }
    const container = document.createElement('div')
    container.innerHTML = renderToString(<AxisProbe />)
    expect(container.textContent).toBe('null:null')
    document.body.append(container)
    const recover = vi.fn()
    let root: ReturnType<typeof hydrateRoot> | undefined
    try {
      await act(async () => { root = hydrateRoot(container, <AxisProbe />, { onRecoverableError: recover }) })
      expect(recover).not.toHaveBeenCalled()
      expect(container.textContent).not.toContain('null')
    } finally { act(() => root?.unmount()); container.remove() }
  })
  it('shares a resize listener, publishes current snapshots and unsubscribes', () => {
    const add = vi.spyOn(window, 'addEventListener')
    const remove = vi.spyOn(window, 'removeEventListener')
    vi.stubGlobal('innerWidth', 390)
    try {
      const { unmount } = render(<><Probe /><Probe /></>)
      expect(screen.getAllByText('390:compact')).toHaveLength(2)
      expect(add.mock.calls.filter(([event]) => event === 'resize')).toHaveLength(1)
      vi.stubGlobal('innerWidth', 900)
      fireEvent(window, new globalThis.Event('resize'))
      expect(screen.getAllByText('900:regular')).toHaveLength(2)
      unmount()
      expect(remove.mock.calls.filter(([event]) => event === 'resize')).toHaveLength(1)
    } finally { vi.unstubAllGlobals(); vi.restoreAllMocks() }
  })

  it('hydrates the server snapshot without a mismatch, then measures the client', async () => {
    const html = renderToString(<Probe />)
    expect(html).toContain('unknown')
    const container = document.createElement('div')
    container.innerHTML = html
    document.body.append(container)
    const onRecoverableError = vi.fn()
    let root: ReturnType<typeof hydrateRoot> | undefined
    try {
      await act(async () => { root = hydrateRoot(container, <Probe />, { onRecoverableError }) })
      expect(onRecoverableError).not.toHaveBeenCalled()
      expect(container).toHaveTextContent(String(window.innerWidth))
    } finally { act(() => root?.unmount()); container.remove() }
  })
})

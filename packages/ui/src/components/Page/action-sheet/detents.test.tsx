import { useRef } from 'react'
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { describe, expect, it, vi } from 'vitest'
import type { IPresentationDetent } from '@/types'
import { eventBus } from '@/common'
import { useDetents } from './use-detents'
import { useTransitionHeight } from './use-transition-height'

const detents: IPresentationDetent[] = ['medium', 200, 'large']
function ResizableSheet() {
  const container = useRef<HTMLDivElement>(null)
  useTransitionHeight({ container, presentationDetents: detents, eventToChangeDetent: 'test-resize-sheet' })
  return <div ref={container} data-testid="resizable-sheet" />
}

describe('action sheet detents', () => {
  it('resolves an SSR fallback, sorts and deduplicates heights while retaining the initial choice', () => {
    function ServerDetents() { return <output>{JSON.stringify(useDetents(['medium', 100, '60%', 'large']))}</output> }
    const html = renderToString(<ServerDetents />)
    expect(html).toContain('[100,400,480,720]')
    expect(html).toContain('480')
  })
  it('supports fractional percentages and an empty-detent fallback', () => {
    vi.stubGlobal('innerHeight', 800)
    try {
      const { result, rerender } = renderHook(({ choices }) => useDetents(choices), { initialProps: { choices: ['50.5%'] as IPresentationDetent[] } })
      expect(result.current.default).toBe(404)
      rerender({ choices: [] })
      expect(result.current).toEqual({ sizes: [720], default: 720 })
    } finally { vi.unstubAllGlobals() }
  })
  it('rejects unsupported detent strings clearly', () => {
    expect(() => renderHook(() => useDetents(['invalid' as IPresentationDetent]))).toThrow('Invalid detent size')
  })
  it('snaps height changes and retains the selected detent when the viewport resizes', () => {
    vi.stubGlobal('innerHeight', 800)
    try {
      const { unmount } = render(<ResizableSheet />)
      const sheet = screen.getByTestId('resizable-sheet')
      expect(sheet.style.height).toBe('400px')
      for (const [height, expected] of [[50, 200], [400, 400], [600, 720], [1000, 720]]) {
        act(() => eventBus.emit('test-resize-sheet', height))
        expect(sheet.style.height).toBe(`${expected}px`)
      }
      const end = new globalThis.Event('transitionend')
      Object.defineProperty(end, 'propertyName', { value: 'height' })
      fireEvent(sheet, end)
      expect(sheet).not.toHaveClass('animate-height')
      vi.stubGlobal('innerHeight', 1000)
      fireEvent(window, new globalThis.Event('resize'))
      expect(sheet.style.height).toBe('900px')
      const remove = vi.spyOn(sheet, 'removeEventListener')
      unmount()
      expect(remove.mock.calls.some(([event]) => event === 'transitionend')).toBe(true)
      expect(eventBus._events['test-resize-sheet']).toHaveLength(0)
    } finally { vi.unstubAllGlobals(); vi.restoreAllMocks() }
  })
  it('does not unregister another subscriber sharing the event', () => {
    const observer = vi.fn()
    eventBus.on('test-resize-sheet', observer)
    const { unmount } = render(<ResizableSheet />)
    unmount()
    eventBus.emit('test-resize-sheet', 300)
    expect(observer).toHaveBeenCalledWith(300)
    eventBus.off('test-resize-sheet', observer)
  })
})

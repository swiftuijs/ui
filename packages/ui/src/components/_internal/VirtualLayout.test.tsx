import { act, fireEvent, render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { LazyVStack } from '../LazyVStack'
import { LazyHStack } from '../LazyHStack'
import { LazyVGrid } from '../LazyVGrid'
import { LazyHGrid } from '../LazyHGrid'

const observers: MockResizeObserver[] = []
class MockResizeObserver {
  elements = new Set<Element>()
  constructor(public callback: ResizeObserverCallback) { observers.push(this) }
  observe = (element: Element) => { this.elements.add(element) }
  unobserve = (element: Element) => { this.elements.delete(element) }
  disconnect = () => { this.elements.clear() }
}
const items = Array.from({ length: 1000 }, (_, index) => <button key={index}>Item {index}</button>)
function notify(element: Element, height: number, width = 300) {
  act(() => {
    for (const observer of observers) {
      if (observer.elements.has(element)) observer.callback([
        { target: element, borderBoxSize: [{ blockSize: height, inlineSize: width }] } as unknown as ResizeObserverEntry,
      ], observer as unknown as ResizeObserver)
    }
  })
}
beforeEach(() => {
  observers.length = 0
  vi.stubGlobal('ResizeObserver', MockResizeObserver)
  vi.spyOn(window, 'scrollTo').mockImplementation(() => {})
  vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(function (this: HTMLElement) {
    const row = this.hasAttribute('data-sw-lazy-row')
    return { top: 0, left: 0, right: 300, bottom: row ? 40 : 200,
      width: row ? 60 : 300, height: row ? 40 : 200, x: 0, y: 0, toJSON() {} }
  })
  vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockImplementation(function (this: HTMLElement) {
    return this.hasAttribute('data-sw-lazy-row') ? 40 : 200
  })
  vi.spyOn(HTMLElement.prototype, 'offsetWidth', 'get').mockImplementation(function (this: HTMLElement) {
    return this.hasAttribute('data-sw-lazy-row') ? 60 : 300
  })
})
afterEach(() => { vi.restoreAllMocks(); vi.unstubAllGlobals() })

describe('measured lazy layouts', () => {
  it.each([
    { name: 'LazyVStack', Component: LazyVStack, horizontal: false, grid: false },
    { name: 'LazyHStack', Component: LazyHStack, horizontal: true, grid: false },
    { name: 'LazyVGrid', Component: LazyVGrid, horizontal: false, grid: true },
    { name: 'LazyHGrid', Component: LazyHGrid, horizontal: true, grid: true },
  ])('$name windows inside an overflow container', ({ Component, horizontal, grid }) => {
    const { container, unmount } = render(<div data-testid="scroller" style={{ overflowX: 'auto', overflowY: 'auto' }}>
      <Component spacing={4}>{items}</Component>
    </div>)
    const scroller = screen.getByTestId('scroller')
    const initialCount = screen.getAllByRole('button').length
    expect(initialCount).toBeLessThan(60)
    expect(screen.getByText('Item 0')).toBeInTheDocument()
    act(() => {
      if (horizontal) scroller.scrollLeft = 5000
      else scroller.scrollTop = 5000
      fireEvent.scroll(scroller)
    })
    expect(screen.queryByText('Item 0')).not.toBeInTheDocument()
    expect(screen.getAllByRole('button').length).toBeLessThan(60)
    const row = container.querySelector<HTMLElement>('[data-sw-lazy-row]')!
    expect(Number(row.dataset.index)).toBeGreaterThan(40)
    expect(row.style.transform).toContain(horizontal ? 'translateX' : 'translateY')
    if (grid) expect(row.children).toHaveLength(2)
    unmount()
    expect(observers.every(observer => observer.elements.size === 0)).toBe(true)
  })

  it('corrects row estimates as content changes size', () => {
    const { container } = render(<div style={{ overflowX: 'auto', overflowY: 'auto' }}>
      <LazyVStack estimatedItemHeight={40}>{items}</LazyVStack>
    </div>)
    const root = container.querySelector<HTMLElement>('.sw-lazyvstack')!
    const row = container.querySelector('[data-sw-lazy-row]')!
    const before = parseFloat(root.style.height)
    notify(row, 120)
    expect(parseFloat(root.style.height)).toBe(before + 80)
    notify(row, 50)
    expect(parseFloat(root.style.height)).toBe(before + 10)
  })

  it('updates cached geometry when spacing and estimates change', () => {
    const { container, rerender } = render(<div style={{ overflowY: 'auto' }}>
      <LazyVStack spacing={4} estimatedItemHeight={40}>{items}</LazyVStack>
    </div>)
    const root = container.querySelector<HTMLElement>('.sw-lazyvstack')!
    const before = parseFloat(root.style.height)
    rerender(<div style={{ overflowY: 'auto' }}>
      <LazyVStack spacing={12} estimatedItemHeight={40}>{items}</LazyVStack>
    </div>)
    expect(parseFloat(root.style.height)).toBe(before + 8 * 999)
    rerender(<div style={{ overflowY: 'auto' }}>
      <LazyVStack spacing={12} estimatedItemHeight={80}>{items}</LazyVStack>
    </div>)
    expect(parseFloat(root.style.height)).toBeGreaterThan(before + 8 * 999)
  })

  it('keeps a focused control and adjacent rows mounted while scrolling', () => {
    render(<div data-testid="scroller" style={{ overflowX: 'auto', overflowY: 'auto' }}><LazyVStack>{items}</LazyVStack></div>)
    const focused = screen.getByRole('button', { name: 'Item 2' })
    act(() => { focused.focus() })
    const scroller = screen.getByTestId('scroller')
    act(() => { scroller.scrollTop = 10000; fireEvent.scroll(scroller) })
    expect(focused).toHaveFocus()
    expect(screen.getByText('Item 3')).toBeInTheDocument()
    act(() => { focused.blur() })
    expect(screen.queryByText('Item 2')).not.toBeInTheDocument()
  })

  it('virtualizes page scrolling without a ScrollView', () => {
    render(<LazyVStack>{items}</LazyVStack>)
    expect(screen.getByText('Item 0')).toBeInTheDocument()
    vi.spyOn(window, 'scrollY', 'get').mockReturnValue(8000)
    fireEvent.scroll(window)
    expect(screen.queryByText('Item 0')).not.toBeInTheDocument()
    expect(screen.getAllByRole('button').length).toBeLessThan(60)
  })

  it('handles empty, incomplete and reduced grids and invalid numeric options', () => {
    const { rerender, container } = render(<LazyVGrid columns={3}>{items.slice(0, 5)}</LazyVGrid>)
    expect(screen.getAllByRole('button')).toHaveLength(5)
    expect(container.querySelectorAll('[data-sw-lazy-row]')[1].children).toHaveLength(2)
    rerender(<LazyVGrid columns={NaN} overscan={NaN} estimatedItemHeight={NaN}>{items.slice(0, 1)}</LazyVGrid>)
    expect(screen.getAllByRole('button')).toHaveLength(1)
    rerender(<LazyVGrid>{[]}</LazyVGrid>)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('renders a bounded, deterministic server window and hydrates without errors', async () => {
    const ui = <LazyVStack estimatedItemHeight={40}>{items}</LazyVStack>
    const html = renderToString(ui)
    expect((html.match(/<button/g) ?? []).length).toBeLessThan(30)
    expect(html).toContain('height:40000px')
    const host = document.createElement('div')
    host.innerHTML = html
    document.body.append(host)
    const errors = vi.fn()
    let root: ReturnType<typeof hydrateRoot>
    await act(async () => { root = hydrateRoot(host, ui, { onRecoverableError: errors }) })
    expect(errors).not.toHaveBeenCalled()
    act(() => root.unmount())
    host.remove()
  })
})

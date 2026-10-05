import { act, render, screen } from '@testing-library/react'
import { renderToString } from 'react-dom/server'
import { hydrateRoot } from 'react-dom/client'
import { expect, it, vi } from 'vitest'
import { useReducedMotion } from './use-reduced-motion'

function Probe() { return <output>{String(useReducedMotion())}</output> }

it('shares one media listener, updates every consumer and releases the last subscription', () => {
  const callbacks = new Set<() => void>()
  const add = vi.fn((_: string, fn: () => void) => callbacks.add(fn))
  const remove = vi.fn((_: string, fn: () => void) => callbacks.delete(fn))
  const media = { matches: false, addEventListener: add, removeEventListener: remove }
  vi.stubGlobal('matchMedia', () => media)
  try {
    const { rerender, unmount } = render(<><Probe /><Probe /></>)
    expect(add).toHaveBeenCalledOnce()
    act(() => { media.matches = true; callbacks.forEach(fn => fn()) })
    expect(screen.getAllByText('true')).toHaveLength(2)
    rerender(<><Probe /></>)
    expect(remove).not.toHaveBeenCalled()
    unmount()
    expect(remove).toHaveBeenCalledOnce()
    expect(callbacks.size).toBe(0)
    media.matches = false
    const next = render(<Probe />)
    expect(screen.getByText('false')).toBeInTheDocument()
    expect(add).toHaveBeenCalledTimes(2)
    next.unmount()
  } finally { vi.unstubAllGlobals() }
})

it('hydrates a static server snapshot before reading the client preference', async () => {
  vi.stubGlobal('matchMedia', () => ({ matches: false, addEventListener() {}, removeEventListener() {} }))
  const container = document.createElement('div')
  container.innerHTML = renderToString(<Probe />)
  expect(container.textContent).toBe('true')
  document.body.append(container)
  const recover = vi.fn()
  let root: ReturnType<typeof hydrateRoot> | undefined
  try {
    await act(async () => { root = hydrateRoot(container, <Probe />, { onRecoverableError: recover }) })
    expect(recover).not.toHaveBeenCalled()
    expect(container.textContent).toBe('false')
  } finally { act(() => root?.unmount()); container.remove(); vi.unstubAllGlobals() }
})

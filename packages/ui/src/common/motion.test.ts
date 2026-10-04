import { afterEach, describe, expect, it, vi } from 'vitest'
import { afterAnimations, prefersReducedMotion } from './motion'

afterEach(() => { vi.useRealTimers(); vi.restoreAllMocks(); vi.unstubAllGlobals() })
describe('motion completion', () => {
  it('completes without an animation event when styles are absent or duration is zero', () => {
    vi.useFakeTimers()
    const complete = vi.fn()
    afterAnimations(document.createElement('div'), complete)
    vi.runAllTimers()
    expect(complete).toHaveBeenCalledTimes(1)
  })
  it('ignores descendant spinners and canceled entry animations during exit', () => {
    vi.useFakeTimers()
    const node = document.createElement('div'), child = document.createElement('span')
    node.append(child)
    node.style.animationName = 'exit'
    node.style.animationDuration = '200ms'
    const complete = vi.fn()
    afterAnimations(node, complete)
    const end = (target: HTMLElement, type: string, name: string) => {
      const event = new globalThis.Event(type, { bubbles: true })
      Object.defineProperty(event, 'animationName', { value: name })
      target.dispatchEvent(event)
    }
    end(child, 'animationend', 'exit')
    end(node, 'animationcancel', 'enter')
    expect(complete).not.toHaveBeenCalled()
    end(node, 'animationend', 'exit')
    vi.runAllTimers()
    expect(complete).toHaveBeenCalledTimes(1)
  })
  it('cancels pending completion when reopened or unmounted', () => {
    vi.useFakeTimers()
    const complete = vi.fn()
    const cancel = afterAnimations(document.createElement('div'), complete)
    cancel()
    vi.runAllTimers()
    expect(complete).not.toHaveBeenCalled()
  })
  it('skips waits when the system asks for reduced motion', () => {
    vi.useFakeTimers()
    vi.stubGlobal('matchMedia', vi.fn(() => ({ matches: true })))
    const node = document.createElement('div')
    node.style.animationName = 'slide'
    node.style.animationDuration = '10s'
    const complete = vi.fn()
    expect(prefersReducedMotion()).toBe(true)
    afterAnimations(node, complete)
    vi.advanceTimersByTime(0)
    expect(complete).toHaveBeenCalledOnce()
  })
})

import { afterEach, describe, expect, it, vi } from 'vitest'
import { TransitionManager as Manager } from './transition-manager'

afterEach(() => vi.restoreAllMocks())

describe('transition configuration', () => {
  it('falls back to CSS when View Transitions are unavailable', () => {
    expect(Manager.getTransitionMode()).toBe('css')
    expect(Manager.getTransitionMode({})).toBe('css')
    expect(Manager.getTransitionMode({ type: 'view-transition' })).toBe('css')
    expect(Manager.getTransitionMode({ type: 'fade' })).toBe('css')
  })
  it('selects native transitions only when requested and supported', () => {
    Object.defineProperty(document, 'startViewTransition', { configurable: true, value: vi.fn() })
    try {
      expect(Manager.getTransitionMode({ type: 'view-transition' })).toBe('view-transition')
      expect(Manager.getTransitionMode({ type: 'slide' })).toBe('css')
    } finally { delete (document as Partial<globalThis.Document>).startViewTransition }
  })
  it('applies a named transition and clears stale names when the configuration changes', () => {
    const element = document.createElement('div')
    Manager.applyTransitionConfig(element, { viewTransitionName: 'article', duration: 250, easing: 'linear' })
    expect(element.style.viewTransitionName).toBe('article')
    expect(element.style.getPropertyValue('--sw-page-duration')).toBe('250ms')
    expect(element.style.getPropertyValue('--sw-page-easing')).toBe('linear')
    Manager.applyTransitionConfig(element, {})
    expect(element.style.viewTransitionName).toBe('')
    Manager.applyTransitionConfig(element)
    expect(element.style.getPropertyValue('--sw-page-duration')).toBe('')
  })
  it.each([
    [{ duration: 400 }, '--sw-page-duration', '400ms'],
    [{ duration: 0 }, '--sw-page-duration', '0ms'],
    [{ easing: 'ease-in' }, '--sw-page-easing', 'ease-in'],
  ])('allows independent duration and easing overrides', (config, variable, expected) => {
    const element = document.createElement('div')
    Manager.applyTransitionConfig(element, config)
    expect(element.style.getPropertyValue(variable)).toBe(expected)
  })
  it('preserves explicit overrides while retaining page defaults', () => {
    const defaults = Manager.getDefaultTransition('page')
    expect(Manager.mergeTransitionConfig({ duration: 100, direction: 'backwards' }, defaults)).toMatchObject({ type: 'slide', duration: 100, direction: 'backwards', easing: defaults.easing })
    expect(Manager.mergeTransitionConfig({ duration: 100 }, { direction: 'forwards' }).direction).toBe('forwards')
    expect(Manager.mergeTransitionConfig(undefined, defaults)).toEqual(defaults)
    expect(Manager.mergeTransitionConfig({ type: 'none' })).toEqual({ type: 'none' })
    expect(Manager.mergeTransitionConfig()).toEqual({ type: 'slide' })
    expect(Manager.getDefaultTransition('actionsheet')).toEqual({ type: 'slide', duration: 320 })
  })
})

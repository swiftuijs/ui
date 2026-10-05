import { useSyncExternalStore } from 'react'
import { prefersReducedMotion } from '@/common/motion'

const listeners = new Set<() => void>()
let media: ReturnType<NonNullable<typeof window.matchMedia>> | undefined
const notifyListeners = () => listeners.forEach(listener => listener())

function subscribe(notify: () => void) {
  listeners.add(notify)
  if (listeners.size === 1) {
    media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
    media?.addEventListener('change', notifyListeners)
  }
  return () => {
    listeners.delete(notify)
    if (!listeners.size) {
      media?.removeEventListener('change', notifyListeners)
      media = undefined
    }
  }
}

const getSnapshot = () => media?.matches ?? prefersReducedMotion()
const getServerSnapshot = () => true

/** SSR starts static; automatic animation starts after hydration when permitted. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

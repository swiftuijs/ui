import { useSyncExternalStore } from 'react'
import { prefersReducedMotion } from '@/common/motion'

function subscribe(notify: () => void) {
  const media = window.matchMedia?.('(prefers-reduced-motion: reduce)')
  media?.addEventListener('change', notify)
  return () => media?.removeEventListener('change', notify)
}

/** SSR starts static; automatic animation starts after hydration when permitted. */
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, prefersReducedMotion, () => true)
}

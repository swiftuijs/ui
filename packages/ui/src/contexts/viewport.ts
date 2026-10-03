'use client'

import { useSyncExternalStore } from 'react'

export interface IViewportInfo {
  /**
   * viewport width
   */
  width: number
  /**
   * viewport height
   */
  height: number
  /**
   * whether viewport is in landscape mode
   */
  landscape: boolean
}

let snapshot: IViewportInfo | null = null
const listeners = new Set<() => void>()

function updateViewport() {
  const { innerWidth: width, innerHeight: height } = window
  if (snapshot?.width === width && snapshot.height === height) return
  snapshot = { width, height, landscape: width > height }
  listeners.forEach(listener => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  if (listeners.size === 1) {
    window.addEventListener('resize', updateViewport, { passive: true })
    updateViewport()
  }
  return () => {
    listeners.delete(listener)
    if (!listeners.size) window.removeEventListener('resize', updateViewport)
  }
}

const getSnapshot = () => snapshot
const getServerSnapshot = () => null

/** Shares one resize listener and a stable null snapshot during hydration. */
export function useViewport(): IViewportInfo | null {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}

export const viewportStore = { getStore: getSnapshot, useStore: useViewport }

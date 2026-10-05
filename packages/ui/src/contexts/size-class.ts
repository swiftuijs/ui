/**
 * SizeClass system for responsive design
 * Similar to SwiftUI's SizeClass concept
 */
import { useMemo, useSyncExternalStore } from 'react'
import { SIZE_CLASS_REGULAR_MIN } from '@/tokens'
import { viewportStore, useViewport } from './viewport'

/**
 * SizeClass type: compact or regular
 */
export type SizeClass = 'compact' | 'regular'

/**
 * SizeClass information
 */
export interface ISizeClassInfo {
  /**
   * Horizontal SizeClass
   * - compact: width is below SIZE_CLASS_REGULAR_MIN.horizontal
   * - regular: width is at or above SIZE_CLASS_REGULAR_MIN.horizontal
   */
  horizontal: SizeClass
  /**
   * Vertical SizeClass
   * - compact: height is below SIZE_CLASS_REGULAR_MIN.vertical
   * - regular: height is at or above SIZE_CLASS_REGULAR_MIN.vertical
   */
  vertical: SizeClass
  /**
   * Viewport width
   */
  width: number
  /**
   * Viewport height
   */
  height: number
}

/**
 * Calculate SizeClass based on viewport dimensions
 */
function resolveAxisSizeClass(value: number, regularMin: number): SizeClass {
  return value < regularMin ? 'compact' : 'regular'
}

export function getSizeClassInfo(viewport: { width: number; height: number } | null): ISizeClassInfo | null {
  if (!viewport) {
    return null
  }

  return {
    horizontal: resolveAxisSizeClass(viewport.width, SIZE_CLASS_REGULAR_MIN.horizontal),
    vertical: resolveAxisSizeClass(viewport.height, SIZE_CLASS_REGULAR_MIN.vertical),
    width: viewport.width,
    height: viewport.height,
  }
}

/**
 * SizeClass store
 */
export const sizeClassStore = {
  getStore: () => getSizeClassInfo(viewportStore.getStore()),
  useStore: useSizeClass,
}

/**
 * Hook to get current SizeClass
 * @returns Current SizeClass information or null if not available
 * 
 * @example
 * ```tsx
 * function ResponsiveComponent() {
 *   const sizeClass = useSizeClass()
 *   
 *   if (sizeClass?.horizontal === 'compact') {
 *     return <VStack>...</VStack>
 *   }
 *   
 *   return <HStack>...</HStack>
 * }
 * ```
 */
export function useSizeClass(): ISizeClassInfo | null {
  const viewport = useViewport()
  return useMemo(() => getSizeClassInfo(viewport), [viewport])
}

const getServerAxis = () => null
const getHorizontal = () => {
  const viewport = viewportStore.getStore()
  return viewport ? resolveAxisSizeClass(viewport.width, SIZE_CLASS_REGULAR_MIN.horizontal) : null
}
const getVertical = () => {
  const viewport = viewportStore.getStore()
  return viewport ? resolveAxisSizeClass(viewport.height, SIZE_CLASS_REGULAR_MIN.vertical) : null
}

/** Only re-renders when the horizontal breakpoint changes; null during SSR. */
export function useHorizontalSizeClass(): SizeClass | null {
  return useSyncExternalStore(viewportStore.subscribe, getHorizontal, getServerAxis)
}

/** Only re-renders when the vertical breakpoint changes; null during SSR. */
export function useVerticalSizeClass(): SizeClass | null {
  return useSyncExternalStore(viewportStore.subscribe, getVertical, getServerAxis)
}

export { SIZE_CLASS_REGULAR_MIN }

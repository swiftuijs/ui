/**
 * SizeClass system for responsive design
 * Similar to SwiftUI's SizeClass concept
 */
import { createStore } from 'plain-store'
import { isInBrowser } from '@/common'
import { SIZE_CLASS_REGULAR_MIN } from '@/tokens'
import { viewportStore } from './viewport'
import { eventBus } from '@/common/event-bus'

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
export const sizeClassStore = createStore<ISizeClassInfo | null>(null)

/**
 * Initialize SizeClass system
 */
if (isInBrowser) {
  // Listen to viewport changes via event bus
  eventBus.on('viewport:change', (viewport: { width: number; height: number } | null) => {
    const sizeClass = getSizeClassInfo(viewport)
    sizeClassStore.setStore(sizeClass)
  })

  // Initialize with current viewport
  const initialViewport = viewportStore.getStore()
  if (initialViewport) {
    const initialSizeClass = getSizeClassInfo(initialViewport)
    sizeClassStore.setStore(initialSizeClass)
  }
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
  return sizeClassStore.useStore()
}

export { SIZE_CLASS_REGULAR_MIN }

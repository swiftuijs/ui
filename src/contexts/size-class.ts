/**
 * SizeClass system for responsive design
 * Similar to SwiftUI's SizeClass concept
 */
import { createStore } from 'plain-store'
import { isInBrowser } from 'src/common'
import { SIZECLASS_BREAKPOINTS } from 'src/common/breakpoints'
import { viewportStore } from './viewport'
import { eventBus } from 'src/common/event-bus'

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
   * - compact: width < 375px (typically small screens)
   * - regular: width >= 375px (typically large screens)
   */
  horizontal: SizeClass
  /**
   * Vertical SizeClass
   * - compact: height < 667px (typically short screens)
   * - regular: height >= 667px (typically tall screens)
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
function calculateSizeClass(viewport: { width: number; height: number } | null): ISizeClassInfo | null {
  if (!viewport) {
    return null
  }

  return {
    horizontal: viewport.width < SIZECLASS_BREAKPOINTS.horizontal ? 'compact' : 'regular',
    vertical: viewport.height < SIZECLASS_BREAKPOINTS.vertical ? 'compact' : 'regular',
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
    const sizeClass = calculateSizeClass(viewport)
    sizeClassStore.setStore(sizeClass)
  })

  // Initialize with current viewport
  const initialViewport = viewportStore.getStore()
  if (initialViewport) {
    const initialSizeClass = calculateSizeClass(initialViewport)
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


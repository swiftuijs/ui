import type { ITransitionOptions } from './view-transition-types'

export type { ITransitionOptions, TransitionDirection } from './view-transition-types'

export interface IViewTransitionOptions extends ITransitionOptions {
  /**
   * View transition name for shared element animations
   * When provided, coordinates transition between source and target elements
   */
  transitionName?: string
}

/**
 * Check if View Transitions API is supported
 */
export function isViewTransitionSupported(): boolean {
  return typeof document !== 'undefined' && 'startViewTransition' in document
}

/**
 * Start a view transition with optional named transition for shared elements
 * 
 * @param options - Transition options including update function, type, and optional transition name
 * @returns Promise that resolves when transition completes
 * 
 * @example
 * ```tsx
 * await startViewTransition({
 *   update: () => setState(newState),
 *   type: 'forwards',
 *   transitionName: 'product-image'
 * })
 * ```
 */
export async function startViewTransition(
  options: IViewTransitionOptions
): Promise<void> {
  if (!isViewTransitionSupported()) {
    // Fallback: immediate update if View Transitions not supported
    options.update()
    return
  }

  // Add direction class to document for CSS targeting
  const directionClass = options.type || 'forwards'
  document.documentElement.classList.add(directionClass)

  const transition = document.startViewTransition(() => {
    options.update()
  })

  // Set transition type for CSS targeting (if supported)
  if (transition.types && options.type) {
    transition.types.add(options.type)
  }

  // Clean up direction class after transition
  try {
    await transition.finished
  } finally {
    document.documentElement.classList.remove(directionClass)
  }
}

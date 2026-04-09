/**
 * Transition direction types
 */
export type TransitionDirection = 'forwards' | 'backwards'

/**
 * Options for starting a view transition
 */
export interface ITransitionOptions {
  /**
   * Function that updates the DOM/state
   */
  update: () => void
  
  /**
   * Transition direction
   * - 'forwards': Pushing new page (slide from right)
   * - 'backwards': Popping page (slide to right)
   */
  type: TransitionDirection
}


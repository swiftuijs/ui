/**
 * Transition animation types
 */
export type TransitionType = 
  | 'slide'           // Slide in/out (default for NavigationStack pages)
  | 'fade'            // Fade in/out
  | 'scale'           // Scale animation
  | 'view-transition' // View Transitions API
  | 'none'            // No animation

/**
 * Transition direction for slide animations
 */
export type TransitionDirection = 
  | 'forwards'  // Push new page (slide from right)
  | 'backwards' // Pop page (slide to right)
  | 'auto'      // Auto-detect based on navigation

/**
 * Transition configuration
 * 
 * Allows customization of page transition animations, similar to SwiftUI's transition modifiers.
 * 
 * @example
 * ```tsx
 * // Default slide animation
 * <NavigationLink destination={Page} />
 * 
 * // View Transitions with shared element
 * <NavigationLink 
 *   destination={DetailPage}
 *   pageOptions={{
 *     transition: {
 *       type: 'view-transition',
 *       viewTransitionName: 'product-image'
 *     }
 *   }}
 * />
 * 
 * // Custom fade transition
 * <NavigationLink 
 *   destination={ModalPage}
 *   pageOptions={{
 *     transition: {
 *       type: 'fade',
 *       duration: 200
 *     }
 *   }}
 * />
 * ```
 */
export interface ITransitionConfig {
  /**
   * Transition type
   * @default 'slide' for pages, 'fade' for modals
   */
  type?: TransitionType
  
  /**
   * Transition direction (for slide type)
   * @default 'auto' - automatically determined from navigation direction
   */
  direction?: TransitionDirection
  
  /**
   * View transition name for shared element animations
   * 
   * When using 'view-transition' type, set the same name on both source and target elements
   * to create smooth morphing animations between them.
   * 
   * @example
   * ```tsx
   * // Source element
   * <NavigationLink 
   *   destination={DetailPage}
   *   pageOptions={{
   *     transition: { type: 'view-transition', viewTransitionName: 'product-image' }
   *   }}
   * >
   *   <div style={{ viewTransitionName: 'product-image' }}>
   *     <Image src={thumbnail} />
   *   </div>
   * </NavigationLink>
   * 
   * // Target element (in DetailPage)
   * <StandardPage transition={{ viewTransitionName: 'product-image' }}>
   *   <Image style={{ viewTransitionName: 'product-image' }} src={fullImage} />
   * </StandardPage>
   * ```
   */
  viewTransitionName?: string
  
  /**
   * Custom animation duration in milliseconds
   * @default 300
   */
  duration?: number
  
  /**
   * Custom easing function
   * @default 'cubic-bezier(0.075, 0.82, 0.165, 1)' for slide
   * @default 'ease-out' for fade
   */
  easing?: string
}


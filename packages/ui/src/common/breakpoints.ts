/**
 * Breakpoint definitions for responsive design
 */

/**
 * Standard breakpoints (iOS/Web standard)
 */
export const BREAKPOINTS = {
  /**
   * Mobile breakpoint (iPhone standard width)
   */
  mobile: 375,
  /**
   * Tablet breakpoint
   */
  tablet: 768,
  /**
   * Desktop breakpoint
   */
  desktop: 1024,
  /**
   * Large desktop breakpoint
   */
  largeDesktop: 1440,
} as const

/**
 * SizeClass breakpoints (for SizeClass calculation)
 */
export const SIZECLASS_BREAKPOINTS = {
  /**
   * Horizontal SizeClass breakpoint
   * - compact: < 375px
   * - regular: >= 375px
   */
  horizontal: 375,
  /**
   * Vertical SizeClass breakpoint
   * - compact: < 667px
   * - regular: >= 667px
   */
  vertical: 667,
} as const

/**
 * Media query breakpoints for CSS
 */
export const MEDIA_QUERIES = {
  mobile: `(max-width: ${BREAKPOINTS.mobile - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,
  largeDesktop: `(min-width: ${BREAKPOINTS.largeDesktop}px)`,
} as const

/**
 * Check if current viewport matches a breakpoint
 * @param width - Viewport width
 * @param breakpoint - Breakpoint to check
 * @returns true if width is greater than or equal to breakpoint
 */
export function matchesBreakpoint(width: number, breakpoint: keyof typeof BREAKPOINTS): boolean {
  return width >= BREAKPOINTS[breakpoint]
}

/**
 * Get current breakpoint name based on width
 * @param width - Viewport width
 * @returns Breakpoint name
 */
export function getBreakpoint(width: number): 'mobile' | 'tablet' | 'desktop' | 'largeDesktop' {
  if (width >= BREAKPOINTS.largeDesktop) {
    return 'largeDesktop'
  }
  if (width >= BREAKPOINTS.desktop) {
    return 'desktop'
  }
  if (width >= BREAKPOINTS.tablet) {
    return 'tablet'
  }
  return 'mobile'
}


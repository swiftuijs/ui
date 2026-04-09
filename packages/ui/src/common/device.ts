/**
 * detect if the code is running in browser
 */
export const isInBrowser = typeof window !== 'undefined' && typeof document !== 'undefined'
/**
 * detect if the device is mobile
 */
export const isMobile = isInBrowser && 'ontouchstart' in document.documentElement

export const EVENT_MOUSEDOWN = isMobile ? 'touchstart' : 'mousedown'
export const EVENT_MOUSEMOVE = isMobile ? 'touchmove' : 'mousemove'
export const EVENT_MOUSEUP = isMobile ? 'touchend' : 'mouseup'

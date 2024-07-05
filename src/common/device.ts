/**
 * detect if the device is mobile
 */
export const isMobile = typeof document !== 'undefined' && 'ontouchstart' in document.documentElement

export const EVENT_MOUSEDOWN = isMobile ? 'touchstart' : 'mousedown'
export const EVENT_MOUSEMOVE = isMobile ? 'touchmove' : 'mousemove'
export const EVENT_MOUSEUP = isMobile ? 'touchend' : 'mouseup'
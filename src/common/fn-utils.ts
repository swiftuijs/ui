/**
 * functional utilities
 */


// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const global: any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const globalObject: any = typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
    ? self
    : typeof global !== 'undefined' ? global : {}

/**
 * throttle
 */
export function throttle(fn: IFn, delay = 200) {
  let lastTime = 0
  let remain = 0
  let tid: unknown = 0
  return function (...args: unknown[]) {
    const now = Date.now()
    clearTimeout(tid as number)
    if (!lastTime || now - lastTime > delay) {
      remain = delay  
    } else {
      remain = delay - (now - lastTime)
    }
    tid = setTimeout(() => {
      fn(...args)
    }, remain)
    lastTime = now
  }
}

/**
 * generate unique id
 * @param prefix id prefix
 * @returns string
 */
export function generateUniqueId(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2)}`
}
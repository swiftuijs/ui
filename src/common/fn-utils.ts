/**
 * functional utilities
 */


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
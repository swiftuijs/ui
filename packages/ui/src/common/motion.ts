/** System preference is read at interaction time, including changes while mounted. */
export function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches === true
}

/** Wait for this element's finite CSS animations, never a child's loading spinner. */
export function afterAnimations(element: HTMLElement, complete: () => void): () => void {
  const style = getComputedStyle(element)
  const times = (value: string) => value.split(',').map(time => parseFloat(time) * (time.trim().endsWith('ms') ? 1 : 1000) || 0)
  const durations = times(style.animationDuration)
  const delays = times(style.animationDelay)
  const names = style.animationName.split(',')
  const iterations = style.animationIterationCount.split(',')
  const totals = names.map((name, i) => name.trim() === 'none' || iterations[i % iterations.length]?.trim() === 'infinite' ? 0
    : durations[i % durations.length] * (parseFloat(iterations[i % iterations.length]) || 1) + delays[i % delays.length])
  const duration = Math.max(0, ...totals)
  let done = false
  const finish = () => {
    if (done) return
    done = true
    clearTimeout(timer)
    element.removeEventListener('animationend', onEnd)
    element.removeEventListener('animationcancel', onEnd)
    complete()
  }
  const onEnd = (event: globalThis.AnimationEvent) => {
    if (event.target === element && !event.pseudoElement && names.some((name, i) => name.trim() === event.animationName && totals[i] === duration)) finish()
  }
  // A fallback also covers cancellation, disabled CSS and background tabs.
  const timer = setTimeout(finish, prefersReducedMotion() ? 0 : duration + (duration ? 50 : 0))
  element.addEventListener('animationend', onEnd)
  element.addEventListener('animationcancel', onEnd)
  return () => {
    done = true
    clearTimeout(timer)
    element.removeEventListener('animationend', onEnd)
    element.removeEventListener('animationcancel', onEnd)
  }
}

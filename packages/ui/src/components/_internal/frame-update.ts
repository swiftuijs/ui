/** Coalesce observer and event bursts; disposal prevents work on a closed surface. */
export function createFrameUpdate(update: () => void) {
  let frame: number | undefined
  const schedule = () => {
    if (frame !== undefined) return
    frame = requestAnimationFrame(() => { frame = undefined; update() })
  }
  const cancel = () => {
    if (frame !== undefined) cancelAnimationFrame(frame)
    frame = undefined
  }
  return { schedule, cancel }
}

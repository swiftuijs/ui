import { useEffect, type RefObject } from 'react'
import { createFrameUpdate } from './frame-update'
import { fitToViewport } from './fit-to-viewport'

/** Keep floating controls within the web viewport without changing their anchor layout. */
export function useViewportFit(ref: RefObject<HTMLElement | null>, open: boolean, revision?: unknown) {
  useEffect(() => {
    const node = ref.current
    if (!open || !node) return
    const update = () => fitToViewport(node)
    const { schedule, cancel } = createFrameUpdate(update)
    update()
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(schedule)
    observer?.observe(node)
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('scroll', schedule, { capture: true, passive: true })
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule, true)
      cancel()
    }
  }, [open, ref, revision])
}

import { useEffect, type RefObject } from 'react'
import { fixedPositionOrigin } from './fixed-position-origin'
import { createFrameUpdate } from './frame-update'
import { fitToViewport } from './fit-to-viewport'

/** A portaled menu follows its trigger without inheriting a scroll pane's clipping. */
export function useMenuAnchor(ref: RefObject<HTMLElement | null>, triggerId: string,
  open: boolean, host: HTMLElement | null, placement: 'top' | 'bottom' | 'left' | 'right') {
  useEffect(() => {
    const node = ref.current, trigger = document.getElementById(triggerId)
    if (!open || !host || !node || !trigger) return
    const update = () => {
      const anchor = trigger.getBoundingClientRect()
      // Dialogs can establish a fixed-position containing block with transform.
      const origin = fixedPositionOrigin(host)
      const x = placement === 'right' ? anchor.right + 4 : placement === 'left' ? anchor.left - 4 : anchor.left
      const y = placement === 'bottom' ? anchor.bottom + 4 : placement === 'top' ? anchor.top - 4 : anchor.top
      Object.assign(node.style, {
        position: 'fixed', left: `${x - origin.left}px`, top: `${y - origin.top}px`,
        right: 'auto', bottom: 'auto', margin: '0',
        transform: placement === 'top' ? 'translateY(-100%)' : placement === 'left' ? 'translateX(-100%)' : 'none',
      })
      fitToViewport(node)
    }
    const { schedule, cancel } = createFrameUpdate(update)
    update()
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(schedule)
    observer?.observe(trigger)
    observer?.observe(node)
    observer?.observe(host)
    window.addEventListener('resize', schedule, { passive: true })
    window.addEventListener('scroll', schedule, { capture: true, passive: true })
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', schedule)
      window.removeEventListener('scroll', schedule, true)
      cancel()
    }
  }, [ref, triggerId, open, host, placement])
}

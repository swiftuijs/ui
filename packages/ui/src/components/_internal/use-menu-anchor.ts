import { useEffect, type RefObject } from 'react'
import { fixedPositionOrigin } from './fixed-position-origin'

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
    }
    update()
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update)
    observer?.observe(trigger)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [ref, triggerId, open, host, placement])
}

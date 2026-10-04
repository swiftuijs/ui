import { useEffect, type RefObject } from 'react'

/** Keep floating controls within the web viewport without changing their anchor layout. */
export function useViewportFit(ref: RefObject<HTMLElement | null>, open: boolean, revision?: unknown) {
  useEffect(() => {
    const node = ref.current
    if (!open || !node) return
    const update = () => {
      node.style.removeProperty('--sw-floating-shift-x')
      node.style.removeProperty('--sw-floating-shift-y')
      // Fit the settled layout, not the transient 96% entrance scale. Override
      // just scale for this synchronous measurement without restarting motion.
      const scale = node.style.getPropertyValue('scale')
      const priority = node.style.getPropertyPriority('scale')
      node.style.setProperty('scale', '1', 'important')
      const box = node.getBoundingClientRect()
      if (scale) node.style.setProperty('scale', scale, priority)
      else node.style.removeProperty('scale')
      const x = Math.max(8 - box.x, Math.min(0, window.innerWidth - 8 - box.right))
      const y = Math.max(8 - box.y, Math.min(0, window.innerHeight - 8 - box.bottom))
      node.style.setProperty('--sw-floating-shift-x', `${x}px`)
      node.style.setProperty('--sw-floating-shift-y', `${y}px`)
    }
    update()
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(update)
    observer?.observe(node)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open, ref, revision])
}

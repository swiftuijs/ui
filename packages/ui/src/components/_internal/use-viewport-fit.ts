import { useEffect, type RefObject } from 'react'

/** Keep floating controls within the web viewport without changing their anchor layout. */
export function useViewportFit(ref: RefObject<HTMLElement | null>, open: boolean, revision?: unknown) {
  useEffect(() => {
    const node = ref.current
    if (!open || !node) return
    const update = () => {
      node.style.removeProperty('--sw-floating-shift-x')
      node.style.removeProperty('--sw-floating-shift-y')
      const box = node.getBoundingClientRect()
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

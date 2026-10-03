import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from 'react'
import type { IPresentationDetent } from '@/types'

export function detentPixels(detent: IPresentationDetent, viewportHeight: number) {
  if (typeof detent === 'number') return Math.max(0, detent)
  const percentage = detent === 'medium' ? 50 : detent === 'large' ? 90 : parseFloat(detent)
  return viewportHeight * percentage / 100
}

interface SheetDragOptions {
  open: boolean
  detents: IPresentationDetent[]
  selectedDetent: IPresentationDetent
  dismissDisabled: boolean
  onDismiss?: () => void
  onDetentChange: (detent: IPresentationDetent) => void
}

/** Transient pointer positions stay in refs and styles, outside React rendering. */
export function useSheetDrag({ open, detents, selectedDetent, dismissDisabled, onDismiss, onDetentChange }: SheetDragOptions) {
  const drag = useRef<{ id: number; startY: number; startHeight: number; height: number;
    panel: HTMLElement; maxHeight: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)

  const reset = () => {
    const current = drag.current
    if (!current) return
    current.panel.style.removeProperty('height')
    delete current.panel.dataset.dragging
    drag.current = null
  }
  useEffect(() => {
    if (!open) { drag.current = null; suppressClick.current = false }
    return () => { drag.current = null }
  }, [open])
  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0 || drag.current) return
    const panel = event.currentTarget.closest<HTMLElement>('[role="dialog"]')!
    suppressClick.current = false
    const startHeight = panel.getBoundingClientRect().height || detentPixels(selectedDetent, window.innerHeight)
    // Measure the layout cap, including calc()/min() and a centered form sheet.
    // This synchronous change is restored before the browser paints.
    const previousHeight = panel.style.height
    panel.style.height = '100dvh'
    const maxHeight = panel.getBoundingClientRect().height || window.innerHeight
    panel.style.height = previousHeight
    drag.current = { id: event.pointerId, startY: event.clientY, startHeight, height: startHeight, panel, maxHeight, moved: false }
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }
  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    const delta = current.startY - event.clientY
    if (Math.abs(delta) > 4) current.moved = true
    if (!current.moved) return
    current.height = Math.max(0, Math.min(current.maxHeight, current.startHeight + delta))
    current.panel.dataset.dragging = 'true'
    current.panel.style.height = `${current.height}px`
  }
  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    suppressClick.current = current.moved
    reset()
    if (!current.moved) return
    const smallest = Math.min(...detents.map(detent => Math.min(current.maxHeight, detentPixels(detent, window.innerHeight))))
    if (!dismissDisabled && current.height < smallest * 0.65
      && current.startHeight - current.height > Math.min(120, current.startHeight * 0.3)) {
      onDismiss?.()
      return
    }
    const nearest = detents.reduce((best, detent) =>
      Math.abs(Math.min(current.maxHeight, detentPixels(detent, window.innerHeight)) - current.height)
        < Math.abs(Math.min(current.maxHeight, detentPixels(best, window.innerHeight)) - current.height) ? detent : best)
    if (nearest !== selectedDetent) onDetentChange(nearest)
  }
  const onPointerCancel = () => {
    if (drag.current) { suppressClick.current = drag.current.moved; reset() }
  }
  return { onPointerDown, onPointerMove, onPointerUp, onPointerCancel,
    onLostPointerCapture: onPointerCancel,
    consumeClick: (detail: number) => {
      const consumed = detail !== 0 && suppressClick.current
      suppressClick.current = false
      return consumed
    },
  }
}

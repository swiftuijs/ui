import { useRef, type PointerEvent, type RefObject } from 'react'
import type { IPresentationDetent } from '@/types'
import { prefixClass, eventBus } from '@/common'
import { useDetents } from './use-detents'

export interface IDragBarProps {
  eventToChangeDetent: string
  presentationDetents: IPresentationDetent[]
  container: RefObject<HTMLDivElement | null>
}

/** A small visual grabber with a separate, accessible touch target. */
export function DragBar({ container, eventToChangeDetent, presentationDetents }: IDragBarProps) {
  const { sizes } = useDetents(presentationDetents)
  const drag = useRef<{ id: number; y: number; height: number; next: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const changeHeight = (height: number) => eventBus.emit(eventToChangeDetent, height)
  const finish = (event: PointerEvent<HTMLButtonElement>, cancelled = false) => {
    const current = drag.current
    if (!current || current.id !== event.pointerId) return
    drag.current = null
    suppressClick.current = current.moved
    changeHeight(cancelled ? current.height : current.next)
  }
  return <button
    type="button"
    aria-label="Adjust sheet height"
    className={prefixClass('dragbar')}
    onPointerDown={event => {
      if (event.button !== 0 || drag.current || !container.current) return
      const height = container.current.getBoundingClientRect().height
      drag.current = { id: event.pointerId, y: event.clientY, height, next: height, moved: false }
      suppressClick.current = false
      container.current.classList.remove('animate-height')
      event.currentTarget.setPointerCapture?.(event.pointerId)
    }}
    onPointerMove={event => {
      const current = drag.current
      if (!current || current.id !== event.pointerId || !container.current) return
      const delta = current.y - event.clientY
      if (Math.abs(delta) > 4) current.moved = true
      if (!current.moved) return
      current.next = Math.max(sizes[0], Math.min(sizes[sizes.length - 1], current.height + delta))
      container.current.style.height = `${current.next}px`
    }}
    onPointerUp={event => finish(event)}
    onPointerCancel={event => finish(event, true)}
    onLostPointerCapture={event => finish(event, true)}
    onClick={event => {
      const suppressed = event.detail !== 0 && suppressClick.current
      suppressClick.current = false
      if (suppressed || !container.current || sizes.length < 2) return
      const height = container.current.getBoundingClientRect().height
      const index = sizes.reduce((best, size, i) => Math.abs(size - height) < Math.abs(sizes[best] - height) ? i : best, 0)
      changeHeight(sizes[(index + 1) % sizes.length])
    }}
  />
}

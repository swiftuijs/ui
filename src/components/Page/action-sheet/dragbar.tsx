import { useEffect, useRef, type RefObject } from 'react'
import type { IPresentationDetent } from 'src/types'
import { prefixClass, isMobile, eventBus,
    EVENT_MOUSEDOWN, EVENT_MOUSEMOVE, EVENT_MOUSEUP } from 'src/common'
// import { viewportStore } from 'src/contexts'

export interface IDragBarProps {
  eventToChangeDetent: string
  presentationDetents: IPresentationDetent[]
  container: RefObject<HTMLDivElement | null>
}

export function DragBar(props: IDragBarProps) {
  const dragRef = useRef<HTMLDivElement>(null)
  const className = prefixClass('dragbar')

  useEffect(() => {
    if (!props.container?.current || !dragRef.current) return
    const container = props.container.current
    const dragbar = dragRef.current

    let containerBottom = 0
    let lastHeight = 0

    const onDrag = (e: MouseEvent | TouchEvent) => {
      // prevent to trigger pull down to refresh on iOS Safari, or other default behavior
      e.preventDefault()
      const clientY = isMobile ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
      // 20 is distance from top
      // 200 is min height
      lastHeight = Math.max(containerBottom - Math.max(20, clientY), 200)
      container.style.height = `${lastHeight}px`
    }
    const onDragEnd = () => {
      eventBus.emit(props.eventToChangeDetent, lastHeight)
      document.removeEventListener(EVENT_MOUSEMOVE, onDrag)
      document.removeEventListener(EVENT_MOUSEUP, onDragEnd)
    }
    const onDragStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      // update container bottom position when start drag, to deal with dynamic content or window resize
      containerBottom = container.getBoundingClientRect().bottom
      document.addEventListener(EVENT_MOUSEMOVE, onDrag)
      document.addEventListener(EVENT_MOUSEUP, onDragEnd)
    }

    dragbar.addEventListener(EVENT_MOUSEDOWN, onDragStart)

    return () => {
      dragbar.removeEventListener(EVENT_MOUSEDOWN, onDragStart)
    }
  }, [props.container, props.eventToChangeDetent, dragRef])

  return (
    <div className={className} ref={dragRef}>
      <span className={prefixClass('dragbar-indicator')} />
    </div>
  )
}
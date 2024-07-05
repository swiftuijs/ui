import { useEffect, useRef, type RefObject } from 'react'
import { prefixClass, isMobile, EVENT_MOUSEDOWN, EVENT_MOUSEMOVE, EVENT_MOUSEUP } from 'src/common'

export interface IDragBarProps {
  container: RefObject<HTMLDivElement | undefined>
}

export function DragBar(props: IDragBarProps) {
  const dragRef = useRef<HTMLDivElement>(null)
  const className = prefixClass('dragbar')

  useEffect(() => {
    if (!props.container?.current || !dragRef.current) return
    const container = props.container.current
    const dragbar = dragRef.current
    const containerBottom = container.getBoundingClientRect().bottom
    const onDrag = (e: MouseEvent | TouchEvent) => {
      // prevent to trigger pull down to refresh on iOS Safari, or other default behavior
      e.preventDefault()
      const clientY = isMobile ? (e as TouchEvent).touches[0].clientY : (e as MouseEvent).clientY
      // 20 is distance from top
      // 200 is min height
      const height = Math.max(containerBottom - Math.max(20, clientY), 200)
      container.style.height = `${height}px`
    }
    const onDragEnd = () => {
      document.removeEventListener(EVENT_MOUSEMOVE, onDrag)
      document.removeEventListener(EVENT_MOUSEUP, onDragEnd)
    }
    const onDragStart = (e: MouseEvent | TouchEvent) => {
      e.preventDefault()
      document.addEventListener(EVENT_MOUSEMOVE, onDrag)
      document.addEventListener(EVENT_MOUSEUP, onDragEnd)
    }
    dragbar.addEventListener(EVENT_MOUSEDOWN, onDragStart)
  
    return () => {
      dragbar.removeEventListener(EVENT_MOUSEDOWN, onDragStart)
    }
  }, [props.container, dragRef])
  

  return (
    <div className={className} ref={dragRef}>
      <span className={prefixClass('dragbar-indicator')} />
    </div>
  )
}
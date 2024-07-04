import { useRef, useEffect } from 'react'

export interface IOverflowOptions {
  /**
   * direction of overflow, default to 'vertical'
   * * vertical: vertical overflow
   * * horizontal: horizontal overflow
   */
  direction?: 'vertical' | 'horizontal'
}

export function useOverflow(props: unknown, options?: IOverflowOptions) {
  const containerRef = useRef<HTMLElement>()

  useEffect(() => {
    if (!containerRef.current) return
    const element = containerRef.current
    const isOverflowed = options?.direction === 'horizontal'
      ? element.scrollWidth > element.clientWidth
      : element.scrollHeight > element.clientHeight
    element.classList.toggle('sw-overflowed', isOverflowed)
  }, [props, options])

  return containerRef
}
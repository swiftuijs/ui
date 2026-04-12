import { memo, useMemo, useRef } from 'react'

import type { IBaseComponent } from '@/types'

export interface IScrollViewProxy {
  scrollTo: (id: string, options?: globalThis.ScrollIntoViewOptions) => void
}

export interface IScrollViewReaderProps extends Omit<IBaseComponent, 'children'> {
  children: (proxy: IScrollViewProxy) => React.ReactNode
}

/**
 * ScrollViewReader provides an imperative scrolling proxy scoped to its
 * rendered subtree.
 *
 * @see https://developer.apple.com/documentation/swiftui/scrollviewreader
 */
export const ScrollViewReader = memo(function ScrollViewReader(props: IScrollViewReaderProps) {
  const { children } = props
  const containerRef = useRef<HTMLDivElement>(null)

  const proxy = useMemo<IScrollViewProxy>(() => ({
    scrollTo: (id, options) => {
      const target = containerRef.current?.querySelector<HTMLElement>(`[data-sw-scroll-id="${id}"]`)
      target?.scrollIntoView(options)
    },
  }), [])

  return <div ref={containerRef}>{children(proxy)}</div>
})

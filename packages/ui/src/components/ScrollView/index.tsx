import { memo, useCallback, useEffect, useRef, type UIEvent } from 'react'
import type { IBaseComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A scrollable view.
 * 
 * Use ScrollView to display content that might be larger than the visible area.
 * ScrollView allows users to scroll through content by dragging or using scroll gestures.
 * 
 * @example
 * ```tsx
 * <ScrollView direction="vertical" showsIndicators={true}>
 *   <VStack>
 *     <Text>Long content here...</Text>
 *   </VStack>
 * </ScrollView>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/scrollview
 */
export interface IScrollViewProps extends IBaseComponent {
  /**
   * The scrollable axis of the scroll view.
   * 
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * A Boolean value that indicates whether the scroll view displays the scroll indicators.
   * 
   * @default true
   */
  showsIndicators?: boolean
  /**
   * The current scroll position of the view.
   */
  scrollPosition?: IScrollPosition
  /**
   * Called when the scroll position changes.
   */
  onScrollPositionChange?: (position: IScrollPosition) => void
  /**
   * Called when the scroll interaction phase changes.
   */
  onScrollPhaseChange?: (phase: IScrollPhase) => void
}

export interface IScrollPosition {
  x?: number
  y?: number
  target?: string | null
}

export type IScrollPhase = 'idle' | 'scrolling'

export const ScrollView = memo(function ScrollView (props: IScrollViewProps) {
  const {
    direction,
    showsIndicators = true,
    scrollPosition,
    onScrollPositionChange,
    onScrollPhaseChange,
    ...sProps
  } = props
  const {commonProps, restProps, children} = standardizeProps(sProps, {
    className: [
      prefixClass('scrollview'),
      direction || 'vertical',
      showsIndicators ? '' : 'no-scroll-bar'
    ]
  })
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollPhaseRef = useRef<IScrollPhase>('idle')
  const scrollIdleTimerRef = useRef<number | null>(null)

  const emitScrollPhase = useCallback((phase: IScrollPhase) => {
    if (scrollPhaseRef.current === phase) {
      return
    }

    scrollPhaseRef.current = phase
    onScrollPhaseChange?.(phase)
  }, [onScrollPhaseChange])

  const handleScroll = useCallback((event: UIEvent<HTMLDivElement>) => {
    const element = event.currentTarget

    onScrollPositionChange?.({
      x: element.scrollLeft,
      y: element.scrollTop,
      target: null,
    })

    emitScrollPhase('scrolling')

    if (scrollIdleTimerRef.current !== null) {
      window.clearTimeout(scrollIdleTimerRef.current)
    }

    scrollIdleTimerRef.current = window.setTimeout(() => {
      emitScrollPhase('idle')
    }, 160)
  }, [emitScrollPhase, onScrollPositionChange])

  useEffect(() => {
    return () => {
      if (scrollIdleTimerRef.current !== null) {
        window.clearTimeout(scrollIdleTimerRef.current)
      }
    }
  }, [])

  useEffect(() => {
    const element = containerRef.current
    if (!element || !scrollPosition) {
      return
    }

    if (scrollPosition.target) {
      const target = element.querySelector<HTMLElement>(`[data-sw-scroll-id="${scrollPosition.target}"]`)
      target?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
      return
    }

    if (scrollPosition.x !== undefined) {
      element.scrollLeft = scrollPosition.x
    }
    if (scrollPosition.y !== undefined) {
      element.scrollTop = scrollPosition.y
    }
  }, [scrollPosition])

  
  return (
    <div
      {...commonProps}
      {...restProps}
      ref={containerRef}
      onScroll={handleScroll}
    >
      {children}
    </div>
  )
})

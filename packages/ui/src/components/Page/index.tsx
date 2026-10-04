import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { IPageType, IFn } from '@/types'
import type { ITransitionConfig } from '@/types/transition'

import { useNaviContext } from '@/contexts'
import { eventBus } from '@/common'
import { afterAnimations } from '@/common/motion'
import { TransitionManager } from '@/common/transition-manager'
import { StandardPage, type IStandardProps } from './standard-page'
import { ActionSheet, type IActionSheetProps } from './action-sheet'

import './style.scss'

/**
 * Props for Page component.
 * Can be either ActionSheet or StandardPage props.
 */
export type IPageProps = (IActionSheetProps | IStandardProps) & {
  /**
   * Transition configuration for page animation
   */
  transition?: ITransitionConfig
}

export interface PageHandle {
  exitPage(callback?: IFn): void
}

/**
 * A container view that represents a single page in a navigation hierarchy.
 *
 * Page is used internally by NavigationStack to manage individual pages.
 * It handles page transitions and lifecycle events.
 *
 * @example
 * ```tsx
 * <Page id="page-1" type="page">
 *   <Text>Page Content</Text>
 * </Page>
 * ```
 */
export const Page = forwardRef<PageHandle, IPageProps>(function Page(props, ref) {
  const { noEnteringAnimation, transition, ...restProps } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const noEnteringAnimationRef = useRef(noEnteringAnimation)
  const stopAnimation = useRef<() => void>(() => {})
  const initialTransition = useRef(transition)
  const naviContext = useNaviContext()
  const pageType: IPageType = props.type || 'page'
  useEffect(() => () => stopAnimation.current(), [])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (noEnteringAnimationRef.current) {
      eventBus.emit(`${naviContext.eventPrefix}.page-entered`, props.id)
      return
    }

    TransitionManager.applyTransitionConfig(container, initialTransition.current)
    container.setAttribute('data-page-status', 'entering')
    stopAnimation.current = afterAnimations(container, () => {
      container.removeAttribute('data-page-status')
      eventBus.emit(`${naviContext.eventPrefix}.page-entered`, props.id)
    })
    return () => stopAnimation.current()

  }, [naviContext.eventPrefix, props.id])

  useImperativeHandle(ref, () => ({
    exitPage(callback?: IFn) {
      const container = containerRef.current
      if (!container) return

      stopAnimation.current()
      container.setAttribute('data-page-status', 'exiting')
      stopAnimation.current = afterAnimations(container, () => callback?.())

    },
  }), [])

  if (pageType === 'actionsheet') {
    return <ActionSheet {...restProps} type="actionsheet" ref={containerRef} />
  }

  return (
    <StandardPage
      {...restProps}
      type="page"
      ref={containerRef}
      transition={transition}
    />
  )
})

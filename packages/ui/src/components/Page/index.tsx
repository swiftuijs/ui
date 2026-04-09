import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import type { IPageType } from '@/types'
import type { ITransitionConfig } from '@/types/transition'

import { useNaviContext } from '@/contexts'
import { eventBus } from '@/common'
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
  const naviContext = useNaviContext()
  const pageType: IPageType = props.type || 'page'

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    if (noEnteringAnimation) {
      eventBus.emit(`${naviContext.eventPrefix}.page-entered`, props.id)
      return
    }

    const onAnimationEnd = () => {
      eventBus.emit(`${naviContext.eventPrefix}.page-entered`, props.id)
      container.removeEventListener('animationend', onAnimationEnd)
    }

    container.addEventListener('animationend', onAnimationEnd)
    container.setAttribute('data-page-status', 'entering')

    return () => {
      container.removeEventListener('animationend', onAnimationEnd)
    }
  }, [naviContext.eventPrefix, noEnteringAnimation, props.id])

  useImperativeHandle(ref, () => ({
    exitPage(callback?: IFn) {
      const container = containerRef.current
      if (!container) return

      const animationEnd = () => {
        container.removeEventListener('animationend', animationEnd)
        callback?.()
      }

      container.addEventListener('animationend', animationEnd)
      container.setAttribute('data-page-status', 'exiting')
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

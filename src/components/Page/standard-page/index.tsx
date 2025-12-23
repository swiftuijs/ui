import { forwardRef, type ReactNode, useEffect, useRef } from 'react'
import type { IPageBaseComponent } from 'src/types'
import type { ITransitionConfig } from 'src/types/transition'
import { standardizeProps, prefixClass } from 'src/common'
import { useNaviContext } from 'src/contexts'
import { NavigationBar } from 'src/components/NavigationBar'
import { TransitionManager } from 'src/common/transition-manager'

import './style.scss'

/**
 * Props for StandardPage component.
 * 
 * A standard page is the default page type in a NavigationStack.
 */
export interface IStandardProps extends IPageBaseComponent {
  /**
   * The page type. Must be 'page' for StandardPage component.
   * 
   * @default 'page'
   */
  type?: 'page'
  /**
   * Navigation bar title.
   * When provided, a navigation bar will be displayed at the top of the page.
   */
  navigationTitle?: string
  /**
   * Toolbar items to display on the right side of the navigation bar.
   */
  toolbarItems?: ReactNode
  /**
   * Transition configuration for page animation.
   * 
   * @example
   * ```tsx
   * <StandardPage 
   *   id="detail"
   *   transition={{
   *     type: 'view-transition',
   *     viewTransitionName: 'product-image'
   *   }}
   * >
   *   ...
   * </StandardPage>
   * ```
   */
  transition?: ITransitionConfig
}

export const StandardPage = forwardRef<HTMLDivElement, IStandardProps>(function StandardPage(props, ref) {
  const { type = 'page', navigationTitle, toolbarItems, transition, ...pProps } = props
  const naviContext = useNaviContext()
  const containerRef = useRef<HTMLDivElement>(null)
  // Determine transition type for CSS targeting
  const transitionType = transition?.type || 'slide'
  
  const { commonProps, restProps, children } = standardizeProps(
    Object.assign({}, pProps),
    {
      className: [prefixClass('page')],
      'data-page-type': type,
      'data-transition-type': transitionType,
    }
  )

  const showBackButton = naviContext.count() > 0
  const hasNavigationBar = !!navigationTitle

  // Apply transition configuration to container
  useEffect(() => {
    if (containerRef.current && transition) {
      TransitionManager.applyTransitionConfig(containerRef.current, transition)
    }
  }, [transition])

  // Merge refs
  const mergedRef = (node: HTMLDivElement | null) => {
    containerRef.current = node
    if (typeof ref === 'function') {
      ref(node)
    } else if (ref) {
      ref.current = node
    }
  }

  return (
    <div {...commonProps} {...restProps} ref={mergedRef}>
      {hasNavigationBar && (
        <NavigationBar
          title={navigationTitle}
          showBackButton={showBackButton}
          onBack={() => naviContext.dismiss()}
          toolbarItems={toolbarItems}
        />
      )}
      <div className={hasNavigationBar ? prefixClass('page-content') : undefined}>
        {children}
      </div>
    </div>
  )
})

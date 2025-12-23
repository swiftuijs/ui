import { memo, useCallback, useRef } from 'react'
import type { ComponentType } from 'react'
import type { IBaseComponent, IPageType } from 'src/types'
import type { ITransitionConfig } from 'src/types/transition'
import { standardizeProps, generateUniqueId, prefixClass } from 'src/common'
import { useNaviContext } from 'src/contexts'

import './style.scss'

/**
 * A view that controls a navigation presentation.
 * 
 * Use NavigationLink to navigate to a destination within a NavigationStack.
 * NavigationLink can navigate to a component or an external URL.
 * 
 * @example
 * ```tsx
 * <NavigationLink destination={MyPage} pageOptions={{ type: 'page' }}>
 *   Go to Page
 * </NavigationLink>
 * ```
 * 
 * @example
 * ```tsx
 * // With custom transition
 * <NavigationLink 
 *   destination={DetailPage}
 *   pageOptions={{
 *     type: 'page',
 *     transition: {
 *       type: 'view-transition',
 *       viewTransitionName: 'product-image'
 *     }
 *   }}
 * >
 *   <div style={{ viewTransitionName: 'product-image' }}>
 *     <ProductCard />
 *   </div>
 * </NavigationLink>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/navigationlink
 */
export interface INavigationLinkProps extends IBaseComponent {
  /**
   * The destination component or URL to navigate to.
   * If a string is provided, it will navigate to that URL.
   * If a ComponentType is provided, it will navigate to that component within the NavigationStack.
   * 
   * @default undefined
   */
  destination?: string | ComponentType

  /**
   * Options for configuring the page presentation.
   */
  pageOptions?: {
    /**
     * The type of page presentation.
     */
    type?: IPageType
    /**
     * Transition configuration for page animation.
     * 
     * @example
     * ```tsx
     * transition: {
     *   type: 'view-transition',
     *   viewTransitionName: 'shared-element'
     * }
     * ```
     */
    transition?: ITransitionConfig
  }

  /**
   * A Boolean value that indicates whether to dismiss the current page.
   * When true, clicking the link will navigate back instead of forward.
   * 
   * @default false
   */
  dismiss?: boolean
}

export const NavigationLink = memo(function NavigationLink (props: INavigationLinkProps) {
  const { destination, dismiss, pageOptions, ...nProps } = props
  const navi = useNaviContext()
  const pageIdRef = useRef(generateUniqueId('page'))

  const {commonProps, restProps, children} = standardizeProps(nProps, {
    className: prefixClass('navigationlink')
  })

  const onClick = useCallback(() => {
    if (dismiss) {
      navi.removeLast()
      return
    }
    if (!destination) {
      console.warn('NavigationLink: destination is not set')
      return
    }
    if (typeof destination === 'string') {
      window.location.href = destination
      return
    }
    navi.append({
      component: destination,
      type: pageOptions?.type,
      id: pageIdRef.current,
      transition: pageOptions?.transition
    })
  }, [destination, navi, dismiss, pageOptions])
  
  return (
    <div {...commonProps} {...restProps} onClick={onClick}>{children}</div>
  )
})
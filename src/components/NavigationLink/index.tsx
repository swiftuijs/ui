import { useCallback } from 'react'
import type { ComponentType } from 'react'
import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'
import { useNaviContext } from 'src/contexts'

import './style.scss'

export interface INavigationLinkProps extends IBaseComponent {
  /**
   * next page component or url
   */
  destination?: string | ComponentType
  /**
   * dismiss current page (back to previous page)
   */
  dismiss?: boolean
}

export function NavigationLink (props: INavigationLinkProps) {
  const { destination, dismiss, children, ...styleProps } = props
  const navi = useNaviContext()

  const combinedStyle = mergeStyle(styleProps, {
    className: 'sw-navigationlink'
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
      type: 'page'
    })  
  }, [destination, navi, dismiss])
  
  return (
    <div {...combinedStyle} onClick={onClick}>{children}</div>
  )
}
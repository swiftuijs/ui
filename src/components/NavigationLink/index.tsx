import { useCallback, useRef } from 'react'
import type { ComponentType } from 'react'
import type { IBaseComponent, IPageType } from 'src/types'
import { standardizeProps, generateUniqueId } from 'src/common'
import { useNaviContext } from 'src/contexts'

import './style.scss'

export interface INavigationLinkProps extends IBaseComponent {
  /**
   * next page component or url
   */
  destination?: string | ComponentType

  pageOptions?: {
    type: IPageType
  }

  /**
   * dismiss current page (back to previous page)
   */
  dismiss?: boolean
}

export function NavigationLink (props: INavigationLinkProps) {
  const { destination, dismiss, pageOptions, ...nProps } = props
  const navi = useNaviContext()
  const pageIdRef = useRef(generateUniqueId('page'))

  const {commonProps, restProps, children} = standardizeProps(nProps, {
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
      type: pageOptions?.type,
      id: pageIdRef.current
    })
  }, [destination, navi, dismiss, pageOptions])
  
  return (
    <div {...commonProps} {...restProps} onClick={onClick}>{children}</div>
  )
}
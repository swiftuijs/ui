import { useCallback } from 'react'
import type { ComponentType } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, startViewTransition } from 'src/common'
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
  const { destination, dismiss, ...nProps } = props
  const navi = useNaviContext()

  const {commonProps, restProps, children} = standardizeProps(nProps, {
    className: 'sw-navigationlink'
  })

  const onClick = useCallback(() => {
    if (dismiss) {
      startViewTransition(() => {
        navi.removeLast()
      })
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

    startViewTransition(() => {
      navi.append({
        component: destination,
        type: 'page'
      })
    })
  }, [destination, navi, dismiss])
  
  return (
    <div {...commonProps} {...restProps} onClick={onClick}>{children}</div>
  )
}
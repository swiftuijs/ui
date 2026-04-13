import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IDefaultScrollAnchorProps extends IBaseComponent {
  anchor?: 'top' | 'center' | 'bottom' | 'leading' | 'trailing'
}

/**
 * DefaultScrollAnchor adapts SwiftUI's defaultScrollAnchor modifier into an explicit wrapper.
 */
export const DefaultScrollAnchor = memo(function DefaultScrollAnchor(props: IDefaultScrollAnchorProps) {
  const {
    anchor = 'top',
    children,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('defaultscrollanchor'),
      prefixClass(`defaultscrollanchor-${anchor}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-default-scroll-anchor={anchor}
    >
      {children}
    </div>
  )
})

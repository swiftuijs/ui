import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IContentTransitionProps extends IBaseComponent {
  transition?: 'opacity' | 'interpolate' | 'scale'
  active?: boolean
}

/**
 * ContentTransition adapts SwiftUI's content-transition modifier into a metadata wrapper.
 */
export const ContentTransition = memo(function ContentTransition(props: IContentTransitionProps) {
  const {
    active = true,
    children,
    transition = 'opacity',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('contenttransition'),
      prefixClass(`contenttransition-${transition}`),
      active && prefixClass('contenttransition-active'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-active={String(active)}
      data-transition={transition}
    >
      {children}
    </span>
  )
})

import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IScrollTransitionProps extends IBaseComponent {
  transition?: 'identity' | 'opacity' | 'scale'
  phase?: 'identity' | 'topLeading' | 'bottomTrailing'
  axis?: 'vertical' | 'horizontal'
  active?: boolean
}

/**
 * ScrollTransition adapts SwiftUI's scroll-transition modifier into an explicit metadata wrapper.
 */
export const ScrollTransition = memo(function ScrollTransition(props: IScrollTransitionProps) {
  const {
    active = true,
    axis = 'vertical',
    children,
    phase = 'identity',
    transition = 'identity',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('scrolltransition'),
      prefixClass(`scrolltransition-${transition}`),
      prefixClass(`scrolltransition-${phase}`),
      active && prefixClass('scrolltransition-active'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-active={String(active)}
      data-axis={axis}
      data-phase={phase}
      data-transition={transition}
    >
      {children}
    </span>
  )
})

import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IScrollBounceBehaviorProps extends IBaseComponent {
  behavior?: 'automatic' | 'always' | 'basedOnSize'
  axes?: 'vertical' | 'horizontal' | 'all'
}

/**
 * ScrollBounceBehavior adapts SwiftUI's scrollBounceBehavior modifier into an explicit wrapper.
 */
export const ScrollBounceBehavior = memo(function ScrollBounceBehavior(
  props: IScrollBounceBehaviorProps
) {
  const {
    axes = 'vertical',
    behavior = 'automatic',
    children,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('scrollbouncebehavior'),
      prefixClass(`scrollbouncebehavior-${behavior}`),
      prefixClass(`scrollbouncebehavior-${axes}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-scroll-bounce-axes={axes}
      data-scroll-bounce-behavior={behavior}
    >
      {children}
    </div>
  )
})

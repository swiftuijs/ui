import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IScrollIndicatorsProps extends IBaseComponent {
  visibility?: 'automatic' | 'visible' | 'hidden'
  axes?: 'vertical' | 'horizontal' | 'all'
}

/**
 * ScrollIndicators adapts SwiftUI's scrollIndicators modifier into an explicit wrapper.
 */
export const ScrollIndicators = memo(function ScrollIndicators(props: IScrollIndicatorsProps) {
  const {
    axes = 'vertical',
    children,
    visibility = 'automatic',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('scrollindicators'),
      prefixClass(`scrollindicators-${visibility}`),
      prefixClass(`scrollindicators-${axes}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-scroll-indicators-axes={axes}
      data-scroll-indicators-visibility={visibility}
    >
      {children}
    </div>
  )
})

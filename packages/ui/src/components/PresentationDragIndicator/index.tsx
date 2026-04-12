import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IPresentationDragIndicatorProps extends IBaseComponent {
  visibility?: 'automatic' | 'visible' | 'hidden'
}

/**
 * PresentationDragIndicator adapts SwiftUI's presentationDragIndicator modifier into an explicit wrapper.
 */
export const PresentationDragIndicator = memo(function PresentationDragIndicator(
  props: IPresentationDragIndicatorProps
) {
  const {
    children,
    visibility = 'automatic',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('presentationdragindicator'),
      prefixClass(`presentationdragindicator-${visibility}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-presentation-drag-indicator={visibility}
    >
      {children}
    </div>
  )
})

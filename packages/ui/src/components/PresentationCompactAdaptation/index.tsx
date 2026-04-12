import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IPresentationCompactAdaptationProps extends IBaseComponent {
  adaptation?: 'automatic' | 'none' | 'popover' | 'sheet' | 'fullScreenCover'
}

/**
 * PresentationCompactAdaptation adapts SwiftUI's presentationCompactAdaptation modifier into an explicit wrapper.
 */
export const PresentationCompactAdaptation = memo(function PresentationCompactAdaptation(
  props: IPresentationCompactAdaptationProps
) {
  const {
    adaptation = 'automatic',
    children,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('presentationcompactadaptation'),
      prefixClass(`presentationcompactadaptation-${adaptation}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-presentation-compact-adaptation={adaptation}
    >
      {children}
    </div>
  )
})

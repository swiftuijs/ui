import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IPresentationCornerRadiusProps extends IBaseComponent {
  radius: number | string
}

function toCssRadius(radius: number | string) {
  return typeof radius === 'number' ? `${radius}px` : radius
}

/**
 * PresentationCornerRadius adapts SwiftUI's presentationCornerRadius modifier into an explicit wrapper.
 */
export const PresentationCornerRadius = memo(function PresentationCornerRadius(props: IPresentationCornerRadiusProps) {
  const {
    children,
    radius,
    style,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('presentationcornerradius')],
    style: {
      ...style,
      '--sw-presentation-corner-radius': toCssRadius(radius),
    },
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-presentation-corner-radius={String(radius)}
    >
      {children}
    </div>
  )
})

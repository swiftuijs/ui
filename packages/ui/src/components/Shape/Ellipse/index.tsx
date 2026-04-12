import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IEllipseProps extends IBaseComponent {
  fill?: string
  stroke?: string
  strokeWidth?: number
}

/**
 * An ellipse that stretches to the provided frame.
 */
export const Ellipse = memo(function Ellipse(props: IEllipseProps) {
  const { fill, stroke, strokeWidth = 0, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('shape'), prefixClass('shape-ellipse')],
    style: {
      backgroundColor: fill,
      borderColor: stroke,
      borderWidth: strokeWidth > 0 ? `${strokeWidth}px` : undefined,
      borderStyle: strokeWidth > 0 ? 'solid' : undefined,
      ...restProps.style,
    },
  })

  return <div {...commonProps} {...finalRestProps} />
})

import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface ICapsuleProps extends IBaseComponent {
  fill?: string
  stroke?: string
  strokeWidth?: number
}

/**
 * A capsule shape with fully rounded ends.
 */
export const Capsule = memo(function Capsule(props: ICapsuleProps) {
  const { fill, stroke, strokeWidth = 0, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('shape'), prefixClass('shape-capsule')],
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

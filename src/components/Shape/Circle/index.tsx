import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for Circle component
 */
export interface ICircleProps extends IBaseComponent {
  /**
   * Fill color
   */
  fill?: string
  /**
   * Stroke color
   */
  stroke?: string
  /**
   * Stroke width
   */
  strokeWidth?: number
}

/**
 * A circular shape.
 * 
 * Circle displays a circular shape, similar to SwiftUI's Circle.
 * 
 * @example
 * ```tsx
 * <Circle fill="#007AFF" style={{ width: 100, height: 100 }} />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/circle
 */
export const Circle = memo(function Circle(props: ICircleProps) {
  const { fill, stroke, strokeWidth = 0, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('shape'), prefixClass('shape-circle')],
    style: {
      backgroundColor: fill,
      borderColor: stroke,
      borderWidth: strokeWidth > 0 ? `${strokeWidth}px` : undefined,
      borderStyle: strokeWidth > 0 ? 'solid' : undefined,
      ...restProps.style,
    },
  })

  return (
    <div {...commonProps} {...finalRestProps} />
  )
})


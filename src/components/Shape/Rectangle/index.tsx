import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for Rectangle component
 */
export interface IRectangleProps extends IBaseComponent {
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
 * A rectangular shape.
 * 
 * Rectangle displays a rectangular shape, similar to SwiftUI's Rectangle.
 * 
 * @example
 * ```tsx
 * <Rectangle fill="#007AFF" style={{ width: 100, height: 50 }} />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/rectangle
 */
export const Rectangle = memo(function Rectangle(props: IRectangleProps) {
  const { fill, stroke, strokeWidth = 0, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('shape'), prefixClass('shape-rectangle')],
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


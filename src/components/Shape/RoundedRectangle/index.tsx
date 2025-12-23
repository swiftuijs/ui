import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for RoundedRectangle component
 */
export interface IRoundedRectangleProps extends IBaseComponent {
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
  /**
   * Corner radius
   * @default 8
   */
  cornerRadius?: number
}

/**
 * A rectangular shape with rounded corners.
 * 
 * RoundedRectangle displays a rectangular shape with rounded corners, similar to SwiftUI's RoundedRectangle.
 * 
 * @example
 * ```tsx
 * <RoundedRectangle fill="#007AFF" cornerRadius={12} style={{ width: 200, height: 100 }} />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/roundedrectangle
 */
export const RoundedRectangle = memo(function RoundedRectangle(props: IRoundedRectangleProps) {
  const { fill, stroke, strokeWidth = 0, cornerRadius = 8, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('shape'), prefixClass('shape-rounded-rectangle')],
    style: {
      backgroundColor: fill,
      borderColor: stroke,
      borderWidth: strokeWidth > 0 ? `${strokeWidth}px` : undefined,
      borderStyle: strokeWidth > 0 ? 'solid' : undefined,
      borderRadius: `${cornerRadius}px`,
      ...restProps.style,
    },
  })

  return (
    <div {...commonProps} {...finalRestProps} />
  )
})


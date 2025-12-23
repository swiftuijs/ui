import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for Color component
 */
export interface IColorProps extends IBaseComponent {
  /**
   * Color value (CSS color string)
   */
  color: string
}

/**
 * A view that displays a solid color.
 * 
 * Color is a view that displays a solid color, similar to SwiftUI's Color.
 * It can be used as a background or foreground color.
 * 
 * @example
 * ```tsx
 * <Color color="#007AFF" />
 * <Color color="rgba(0, 122, 255, 0.5)" />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/color
 */
export const Color = memo(function Color(props: IColorProps) {
  const { color, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('color')],
    style: {
      backgroundColor: color,
      ...restProps.style,
    },
  })

  return (
    <div {...commonProps} {...finalRestProps} />
  )
})


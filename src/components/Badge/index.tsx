import { memo, type ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for Badge component
 */
export interface IBadgeProps extends Omit<IBaseComponent, 'style'> {
  /**
   * Badge content (text or number)
   */
  children: ReactNode
  /**
   * Badge style variant
   * @default 'default'
   */
  variant?: 'default' | 'primary' | 'success' | 'warning' | 'error'
  /**
   * Custom CSS style (overrides variant)
   */
  style?: IBaseComponent['style']
}

/**
 * A view that displays a badge.
 * 
 * Badge is used to display small pieces of information, such as notification counts
 * or status indicators, similar to SwiftUI's Badge.
 * 
 * @example
 * ```tsx
 * <Badge>5</Badge>
 * <Badge style="error">New</Badge>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/badge
 */
export const Badge = memo(function Badge(props: IBadgeProps) {
  const { children, variant = 'default', style, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(
    { ...restProps, style },
    {
      className: [
        prefixClass('badge'),
        prefixClass(`badge-${variant}`),
      ],
    }
  )

  return (
    <div {...commonProps} {...finalRestProps}>
      {children}
    </div>
  )
})


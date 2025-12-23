import { memo, type ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for Label component
 */
export interface ILabelProps extends Omit<IBaseComponent, 'style'> {
  /**
   * Label icon
   */
  icon?: ReactNode
  /**
   * Label text
   */
  title: string
  /**
   * Label style variant
   * @default 'automatic'
   */
  variant?: 'automatic' | 'iconOnly' | 'titleOnly'
  /**
   * Custom CSS style (overrides variant)
   */
  style?: IBaseComponent['style']
}

/**
 * A view that displays an icon and a title.
 * 
 * Label combines an icon and text in a single view, similar to SwiftUI's Label.
 * It's commonly used in lists, menus, and other UI elements.
 * 
 * @example
 * ```tsx
 * <Label icon="🏠" title="Home" />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/label
 */
export const Label = memo(function Label(props: ILabelProps) {
  const { icon, title, variant = 'automatic', style, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(
    { ...restProps, style },
    {
      className: [prefixClass('label')],
    }
  )

  const showIcon = variant !== 'titleOnly' && icon
  const showTitle = variant !== 'iconOnly' && title

  return (
    <div {...commonProps} {...finalRestProps}>
      {showIcon && (
        <span className={prefixClass('label-icon')}>
          {icon}
        </span>
      )}
      {showTitle && (
        <span className={prefixClass('label-title')}>
          {title}
        </span>
      )}
    </div>
  )
})


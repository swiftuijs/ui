import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A view that shows that a task is in progress.
 * 
 * Use ActivityIndicator to show that a task is in progress. It displays a spinning indicator.
 * 
 * @example
 * ```tsx
 * <ActivityIndicator />
 * <ActivityIndicator size="large" />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/progressview
 */
export interface IActivityIndicatorProps extends IBaseComponent {
  /**
   * The size of the activity indicator.
   * 
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large'
  /**
   * The color of the activity indicator.
   * Uses accent color by default.
   */
  color?: string
}

export const ActivityIndicator = memo(function ActivityIndicator(props: IActivityIndicatorProps) {
  const {
    size = 'medium',
    color,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('activityindicator'), prefixClass(`activityindicator-${size}`)]
  })

  const style = color ? { '--indicator-color': color } : undefined

  return (
    <div {...commonProps} {...finalRestProps} style={{ ...commonProps.style, ...style }}>
      <div className={prefixClass('activityindicator-spinner')}>
        <div className={prefixClass('activityindicator-circle')} />
        <div className={prefixClass('activityindicator-circle')} />
        <div className={prefixClass('activityindicator-circle')} />
        <div className={prefixClass('activityindicator-circle')} />
        <div className={prefixClass('activityindicator-circle')} />
        <div className={prefixClass('activityindicator-circle')} />
        <div className={prefixClass('activityindicator-circle')} />
        <div className={prefixClass('activityindicator-circle')} />
      </div>
    </div>
  )
})


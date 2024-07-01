import type { IBaseComponent } from 'src/types'
import { mergeStyle, standardizeUnit } from 'src/common'

import './style.scss'

/**
 * An alignment position along the vertical axis.
 */
export enum EVerticalAlignment {
  /** A guide marking the bottom edge of the view. */
  bottom = 'bottom',
  /** A guide marking the vertical center of the view. */
  center = 'middle',
  /** A guide marking the top edge of the view. */
  top = 'top',
  // firstTextBaseline,
}

export interface IHStackProps extends IBaseComponent {
  /**
   * The guide for aligning the subviews in this stack.
   *  This guide has the same vertical screen coordinate for every child view.
   */
  alignment?: EVerticalAlignment
  /**
   * The distance between adjacent subviews,
   *  or nil if you want the stack to choose a default distance for each pair of subviews.
   */
  spacing?: number
}

export function HStack(props: IHStackProps) {
  const { children, alignment = 'top', spacing, ...styleProps } = props
  const className = ['sw-hstack', `align-${alignment}`]

  const combinedStyle = mergeStyle(styleProps, {
    className,
    style: {
      '--spacing': standardizeUnit(spacing || 0)
    }
  })
  return (
    <div {...combinedStyle}>
      {children}
    </div>
  )
}
import { memo } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A container that arranges rows and cells in a two-dimensional grid.
 *
 * @see https://developer.apple.com/documentation/swiftui/grid
 */
export interface IGridProps extends IBaseComponent {
  /**
   * Number of columns in the grid.
   *
   * @default 1
   */
  columns?: number
  /**
   * Spacing between rows and columns, in pixels.
   *
   * @default 0
   */
  spacing?: number
}

export const Grid = memo(function Grid(props: IGridProps) {
  const { columns = 1, spacing = 0, ...restProps } = props
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('grid'),
    style: {
      '--grid-columns': columns,
      '--grid-spacing': `${spacing}px`,
    },
  })

  return (
    <div {...commonProps} {...finalRestProps} role="grid">
      {children}
    </div>
  )
})

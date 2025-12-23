import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A container that arranges its children in a horizontal grid, loading them lazily.
 * 
 * LazyHGrid creates a horizontal grid layout with lazy loading for performance.
 * 
 * @example
 * ```tsx
 * <LazyHGrid rows={2} spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyHGrid>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/lazyhgrid
 */
export interface ILazyHGridProps extends IBaseComponent {
  /**
   * Number of rows in the grid.
   * 
   * @default 2
   */
  rows?: number
  /**
   * Spacing between grid items.
   * 
   * @default 0
   */
  spacing?: number
}

export const LazyHGrid = memo(function LazyHGrid(props: ILazyHGridProps) {
  const { rows = 2, spacing = 0, ...restProps } = props

  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('lazyhgrid'),
    style: {
      '--grid-rows': rows,
      '--grid-spacing': `${spacing}px`,
    },
  })

  return (
    <div {...commonProps} {...finalRestProps}>
      {children}
    </div>
  )
})


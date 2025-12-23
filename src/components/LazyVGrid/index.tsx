import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A container that arranges its children in a grid, loading them lazily.
 * 
 * LazyVGrid creates a vertical grid layout with lazy loading for performance.
 * 
 * @example
 * ```tsx
 * <LazyVGrid columns={3} spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyVGrid>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/lazyvgrid
 */
export interface ILazyVGridProps extends IBaseComponent {
  /**
   * Number of columns in the grid.
   * 
   * @default 2
   */
  columns?: number
  /**
   * Spacing between grid items.
   * 
   * @default 0
   */
  spacing?: number
}

export const LazyVGrid = memo(function LazyVGrid(props: ILazyVGridProps) {
  const { columns = 2, spacing = 0, ...restProps } = props

  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('lazyvgrid'),
    style: {
      '--grid-columns': columns,
      '--grid-spacing': `${spacing}px`,
    },
  })

  return (
    <div {...commonProps} {...finalRestProps}>
      {children}
    </div>
  )
})


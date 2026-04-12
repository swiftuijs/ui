import { Children, cloneElement, isValidElement, memo, type ReactElement } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A single row within a Grid.
 *
 * @see https://developer.apple.com/documentation/swiftui/gridrow
 */
export type IGridRowProps = IBaseComponent

export const GridRow = memo(function GridRow(props: IGridRowProps) {
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(props, {
    className: prefixClass('gridrow'),
  })

  return (
    <div {...commonProps} {...finalRestProps} role="row">
      {Children.map(children, (child) => {
        if (!isValidElement(child)) {
          return child
        }

        return (
          <div className={prefixClass('gridrow-cell')} role="gridcell">
            {cloneElement(child as ReactElement<Record<string, unknown>>)}
          </div>
        )
      })}
    </div>
  )
})

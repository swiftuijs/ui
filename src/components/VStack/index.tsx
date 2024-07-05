import type { IBaseComponent } from 'src/types'
import { standardizeProps, standardizeUnit } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

export interface IVStackProps extends IBaseComponent {
  /**
   * The distance between adjacent subviews,
   *  or nil if you want the stack to choose a default distance for each pair of subviews.
   */
  spacing?: number
}

export function VStack(props: IVStackProps) {
  const { spacing, ...vProps } = props
  const { children, commonProps, restProps } = standardizeProps(vProps, {
    className: ['sw-vstack', 'sw-container'],
    style: {
      '--vstack-spacing': standardizeUnit(spacing || 0),
    },
  })
  return (
    <LayoutContext.Provider value={{ boxDirection: 'column' }}>
      <div {...commonProps} {...restProps}>
        {children}
      </div>
    </LayoutContext.Provider>
  )
}

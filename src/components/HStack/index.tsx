import type { IBaseComponent, EAlignment } from 'src/types'
import { standardizeProps, standardizeUnit } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

export interface IHStackProps extends IBaseComponent {
  /**
   * The guide for aligning the subviews in this stack.
   *  This guide has the same vertical screen coordinate for every child view.
   */
  alignment?: EAlignment
  /**
   * The distance between adjacent subviews,
   *  or nil if you want the stack to choose a default distance for each pair of subviews.
   */
  spacing?: number
}

export function HStack(props: IHStackProps) {
  const { alignment = 'center', spacing, ...hProps } = props

  const {commonProps, restProps, children} = standardizeProps(hProps, {
    className: ['sw-hstack', 'sw-container', `align-${alignment}`],
    style: {
      '--hstack-spacing': standardizeUnit(spacing || 0)
    }
  })
  return (
    <LayoutContext.Provider value={{ boxDirection: 'row' }}>
      <div {...commonProps} {...restProps}>
      {children}
    </div>
    </LayoutContext.Provider>
  )
}
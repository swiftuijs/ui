import type { IBaseComponent, EAlignment } from 'src/types'
import { standardizeProps, standardizeUnit } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

/**
 * A view that arranges its children in a horizontal line.
 * 
 * An HStack is a container view that arranges its child views in a horizontal line.
 * You can customize the spacing between views and the alignment of views within the stack.
 * 
 * @example
 * ```tsx
 * <HStack spacing={10} alignment="center">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </HStack>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/hstack
 */
export interface IHStackProps extends IBaseComponent {
  /**
   * The guide for aligning the subviews in this stack.
   * This guide has the same vertical screen coordinate for every child view.
   * 
   * @default 'center'
   */
  alignment?: EAlignment
  /**
   * The distance between adjacent subviews, in pixels.
   * If nil, the stack chooses a default distance for each pair of subviews.
   * 
   * @default 0
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
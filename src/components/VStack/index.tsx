import type { IBaseComponent, EAlignment } from 'src/types'
import { standardizeProps, standardizeUnit, prefixClass } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

/**
 * A view that arranges its children in a vertical line.
 * 
 * A VStack is a container view that arranges its child views in a vertical line.
 * You can customize the spacing between views and the alignment of views within the stack.
 * 
 * @example
 * ```tsx
 * <VStack spacing={10} alignment="leading">
 *   <Text>First</Text>
 *   <Text>Second</Text>
 * </VStack>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/vstack
 */
export interface IVStackProps extends IBaseComponent {
  /**
   * The guide for aligning the subviews in this stack.
   * This guide has the same horizontal screen coordinate for every child view.
   * 
   * @default undefined (uses container default)
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

export function VStack(props: IVStackProps) {
  const { spacing, ...vProps } = props
  const { children, commonProps, restProps } = standardizeProps(vProps, {
    className: [prefixClass('vstack'), prefixClass('container')],
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

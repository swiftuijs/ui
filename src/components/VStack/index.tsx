import { memo } from 'react'
import type { IBaseComponent, EAlignment } from 'src/types'
import { BaseStack } from '../Stack/BaseStack'

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

export const VStack = memo(function VStack(props: IVStackProps) {
  const { spacing, alignment, ...restProps } = props

  return (
    <BaseStack
      direction="column"
      spacing={spacing}
      alignment={alignment}
      stackClassName="vstack"
      {...restProps}
    />
  )
})

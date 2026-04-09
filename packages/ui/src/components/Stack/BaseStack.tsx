import type { IBaseComponent, EAlignment } from '@/types'
import {
  createCssVariables,
  resolveSpacingValue,
  standardizeProps,
  prefixClass,
} from '@/common'
import { LayoutContext } from '@/contexts'

export interface IBaseStackProps extends IBaseComponent {
  /**
   * The direction of the stack.
   * - 'row' for horizontal stacking (HStack)
   * - 'column' for vertical stacking (VStack)
   * - undefined for overlay stacking (ZStack)
   */
  direction?: 'row' | 'column'
  /**
   * The distance between adjacent subviews, in pixels.
   * Only applies to HStack and VStack, not ZStack.
   */
  spacing?: number | string
  /**
   * The alignment of the children within the stack.
   */
  alignment?: EAlignment
  /**
   * The base class name for the stack component (e.g., 'hstack', 'vstack', 'zstack').
   */
  stackClassName: string
  /**
   * Custom style variables specific to the stack type.
   */
  styleVars?: Record<`--${string}`, string | number | undefined>
}

/**
 * Base component for stack-based layout components (HStack, VStack, ZStack).
 * Handles common logic like spacing, alignment, and LayoutContext.
 */
export function BaseStack(props: IBaseStackProps) {
  const {
    direction,
    spacing,
    alignment,
    stackClassName,
    styleVars = {},
    children,
    ...restProps
  } = props

  const style = createCssVariables({
    ...styleVars,
    '--stack-spacing': direction ? resolveSpacingValue(spacing) : undefined,
  })

  const { commonProps, restProps: finalRestProps } = standardizeProps(
    { ...restProps, alignment },
    {
      className: [prefixClass(stackClassName), prefixClass('container')],
      style,
    }
  )

  const content = (
    <div {...commonProps} {...finalRestProps}>
      {children}
    </div>
  )

  // Only wrap with LayoutContext if direction is specified (HStack/VStack)
  if (direction) {
    return (
      <LayoutContext.Provider value={{ boxDirection: direction }}>
        {content}
      </LayoutContext.Provider>
    )
  }

  return content
}

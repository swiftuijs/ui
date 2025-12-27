import { useMemo } from 'react'
import type { IBaseComponent, EAlignment } from 'src/types'
import { standardizeProps, standardizeUnit, prefixClass } from 'src/common'
import { LayoutContext } from 'src/contexts'

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
  spacing?: number
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
  styleVars?: Record<string, string | number>
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

  // Serialize styleVars for stable dependency comparison
  const styleVarsKey = useMemo(() => 
    JSON.stringify(styleVars), 
    [styleVars]
  )

  // Memoize style object to prevent unnecessary re-renders
  const style = useMemo(() => {
    const styleObj: Record<string, string> = {}
    Object.entries(styleVars).forEach(([key, value]) => {
      styleObj[key] = String(value)
    })
    if (spacing !== undefined && direction !== undefined) {
      const spacingVar = direction === 'row' ? '--hstack-spacing' : '--vstack-spacing'
      styleObj[spacingVar] = standardizeUnit(spacing)
    }
    return styleObj
  }, [styleVarsKey, spacing, direction])

  // Memoize className array to prevent unnecessary re-renders
  const classNameArray = useMemo(() => {
    const classes = [prefixClass(stackClassName), prefixClass('container')]
    if (alignment) {
      classes.push(`align-${alignment}`)
    }
    return classes
  }, [stackClassName, alignment])

  const { commonProps, restProps: finalRestProps } = standardizeProps(
    { ...restProps, alignment },
    {
      className: classNameArray,
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


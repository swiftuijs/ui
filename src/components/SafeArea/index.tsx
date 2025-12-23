import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for SafeArea component
 */
export interface ISafeAreaProps extends IBaseComponent {
  /**
   * Safe area edges to apply
   * @default ['top', 'bottom', 'left', 'right']
   */
  edges?: Array<'top' | 'bottom' | 'left' | 'right'>
}

/**
 * A view that insets its content to respect safe area boundaries.
 * 
 * SafeArea ensures that content is not obscured by system UI elements,
 * such as notches, status bars, or home indicators, similar to SwiftUI's SafeArea.
 * 
 * @example
 * ```tsx
 * <SafeArea>
 *   <Text>Content that respects safe areas</Text>
 * </SafeArea>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/safearea
 */
export const SafeArea = memo(function SafeArea(props: ISafeAreaProps) {
  const { edges = ['top', 'bottom', 'left', 'right'], children, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('safe-area'),
      ...edges.map(edge => prefixClass(`safe-area-${edge}`)),
    ],
  })

  return (
    <div {...commonProps} {...finalRestProps}>
      {children}
    </div>
  )
})


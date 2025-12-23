import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A container for grouping view content.
 * 
 * Group is a transparent container that groups views together without adding visual styling.
 * It's useful for applying modifiers to multiple views at once.
 * 
 * @example
 * ```tsx
 * <Group>
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 * </Group>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/group
 */
export type IGroupProps = IBaseComponent

export const Group = memo(function Group(props: IGroupProps) {
  const { commonProps, restProps, children } = standardizeProps(props, {
    className: prefixClass('group')
  })

  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
})


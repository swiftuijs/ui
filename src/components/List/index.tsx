import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

/**
 * A container that presents rows of data arranged in a single column.
 * 
 * Use List to display a collection of data arranged in a single column.
 * Lists work well for displaying data that can be organized into rows.
 * 
 * @example
 * ```tsx
 * <List>
 *   <Section header={<Text>Section 1</Text>}>
 *     <Text>Item 1</Text>
 *     <Text>Item 2</Text>
 *   </Section>
 * </List>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/list
 */
export type IListProps = IBaseComponent

export function List (props: IListProps) {
  const { ...cProps } = props

  const {commonProps, restProps, children} = standardizeProps(cProps, {
    className: 'sw-list'
  })
  
  return (
    <div {...commonProps} {...restProps}>{children}</div>
  )
}
import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, standardizeUnit } from 'src/common'

import './style.scss'

/**
 * A flexible space that expands along the major axis of its parent container.
 * 
 * A Spacer expands to make its containing view as large as possible in the direction
 * of the major axis. If multiple spacers are used, they divide the available space equally.
 * 
 * @example
 * ```tsx
 * <HStack>
 *   <Text>Left</Text>
 *   <Spacer />
 *   <Text>Right</Text>
 * </HStack>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/spacer
 */
export interface ISpacerProps extends Omit<IBaseComponent, 'children'>{
  /**
   * The minimum length of the spacer, in pixels or as a CSS value string.
   * 
   * @default 0
   */
  minLength?: number | string
}

export const Spacer = memo(function Spacer (props: ISpacerProps) {
  const { minLength, ...sProps } = props

  const {commonProps, restProps} = standardizeProps(sProps, {
    style: {
      '--min-length': standardizeUnit(minLength || 0),
    },
    className: 'sw-spacer'
  })
  
  return (
    <div {...commonProps} {...restProps}/>
  )
})
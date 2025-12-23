import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A container that presents content on a card.
 * 
 * Card is a container with elevated styling, typically used to display related content.
 * 
 * @example
 * ```tsx
 * <Card>
 *   <Text>Card Content</Text>
 * </Card>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/card
 */
export interface ICardProps extends IBaseComponent {}

export const Card = memo(function Card(props: ICardProps) {
  const { commonProps, restProps, children } = standardizeProps(props, {
    className: prefixClass('card')
  })

  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
})


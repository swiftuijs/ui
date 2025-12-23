import { memo, type ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Toolbar item placement
 */
export type ToolbarPlacement = 'automatic' | 'principal' | 'cancellationAction' | 'confirmationAction' | 'destructiveAction' | 'navigation'

/**
 * Toolbar item configuration
 */
export interface IToolbarItem {
  /**
   * Item content
   */
  content: ReactNode
  /**
   * Item placement
   * @default 'automatic'
   */
  placement?: ToolbarPlacement
  /**
   * Item identifier
   */
  id?: string
}

/**
 * Props for Toolbar component
 */
export interface IToolbarProps extends IBaseComponent {
  /**
   * Toolbar items
   */
  items: IToolbarItem[]
}

/**
 * A view that displays toolbar items.
 * 
 * Toolbar provides a container for toolbar items, similar to SwiftUI's Toolbar.
 * Items can be placed in different positions based on their placement property.
 * 
 * @example
 * ```tsx
 * <Toolbar
 *   items={[
 *     { content: <Button>Cancel</Button>, placement: 'cancellationAction' },
 *     { content: <Text>Title</Text>, placement: 'principal' },
 *     { content: <Button>Done</Button>, placement: 'confirmationAction' },
 *   ]}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/toolbar
 */
export const Toolbar = memo(function Toolbar(props: IToolbarProps) {
  const { items, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('toolbar')],
  })

  const groupedItems = items.reduce((acc, item) => {
    const placement = item.placement || 'automatic'
    if (!acc[placement]) {
      acc[placement] = []
    }
    acc[placement].push(item)
    return acc
  }, {} as Record<ToolbarPlacement, IToolbarItem[]>)

  return (
    <div {...commonProps} {...finalRestProps}>
      <div className={prefixClass('toolbar-content')}>
        {groupedItems.cancellationAction && (
          <div className={prefixClass('toolbar-group')}>
            {groupedItems.cancellationAction.map((item, index) => (
              <div key={item.id || index} className={prefixClass('toolbar-item')}>
                {item.content}
              </div>
            ))}
          </div>
        )}
        {groupedItems.principal && (
          <div className={`${prefixClass('toolbar-group')} ${prefixClass('toolbar-group-center')}`}>
            {groupedItems.principal.map((item, index) => (
              <div key={item.id || index} className={prefixClass('toolbar-item')}>
                {item.content}
              </div>
            ))}
          </div>
        )}
        {groupedItems.automatic && (
          <div className={prefixClass('toolbar-group')}>
            {groupedItems.automatic.map((item, index) => (
              <div key={item.id || index} className={prefixClass('toolbar-item')}>
                {item.content}
              </div>
            ))}
          </div>
        )}
        {groupedItems.confirmationAction && (
          <div className={`${prefixClass('toolbar-group')} ${prefixClass('toolbar-group-end')}`}>
            {groupedItems.confirmationAction.map((item, index) => (
              <div key={item.id || index} className={prefixClass('toolbar-item')}>
                {item.content}
              </div>
            ))}
          </div>
        )}
        {groupedItems.destructiveAction && (
          <div className={`${prefixClass('toolbar-group')} ${prefixClass('toolbar-group-end')}`}>
            {groupedItems.destructiveAction.map((item, index) => (
              <div key={item.id || index} className={`${prefixClass('toolbar-item')} ${prefixClass('toolbar-item-destructive')}`}>
                {item.content}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
})


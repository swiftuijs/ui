import { memo, type ReactNode } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

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
export interface IToolbarProps extends IBaseElementComponent<'div'> {
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

  const renderGroup = (placement: ToolbarPlacement, className?: string) => {
    const placementItems = groupedItems[placement]

    if (!placementItems?.length) {
      return null
    }

    return (
      <div className={[prefixClass('toolbar-group'), className].filter(Boolean).join(' ')} data-placement={placement}>
        {placementItems.map((item, index) => (
          <div
            key={item.id || `${placement}-${index}`}
            className={[
              prefixClass('toolbar-item'),
              placement === 'destructiveAction' ? prefixClass('toolbar-item-destructive') : undefined,
            ].filter(Boolean).join(' ')}
          >
            {item.content}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      role="toolbar"
      aria-orientation="horizontal"
    >
      <div className={prefixClass('toolbar-content')}>
        {renderGroup('navigation')}
        {renderGroup('cancellationAction')}
        {renderGroup('principal', prefixClass('toolbar-group-center'))}
        {renderGroup('automatic')}
        {renderGroup('confirmationAction', prefixClass('toolbar-group-end'))}
        {renderGroup('destructiveAction', prefixClass('toolbar-group-end'))}
      </div>
    </div>
  )
})

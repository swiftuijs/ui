import { useState, useRef, useEffect, type ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Menu item configuration
 */
export interface IMenuItem {
  /**
   * Menu item label
   */
  label: string
  /**
   * Menu item icon (optional)
   */
  icon?: ReactNode
  /**
   * Action handler
   */
  action?: () => void
  /**
   * Whether the item is disabled
   */
  disabled?: boolean
  /**
   * Submenu items (for nested menus)
   */
  submenu?: IMenuItem[]
  /**
   * Item identifier
   */
  id?: string
}

/**
 * Props for Menu component
 */
export interface IMenuProps extends IBaseComponent {
  /**
   * Menu items
   */
  items: IMenuItem[]
  /**
   * Trigger element
   */
  trigger: ReactNode
  /**
   * Menu placement
   * @default 'bottom'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right'
  /**
   * Whether the menu is open (controlled)
   */
  isOpen?: boolean
  /**
   * Open state change handler
   */
  onOpenChange?: (isOpen: boolean) => void
}

/**
 * A view that displays a menu of options.
 * 
 * Menu displays a dropdown menu when triggered, similar to SwiftUI's Menu.
 * It supports nested submenus and can be positioned relative to the trigger.
 * 
 * @example
 * ```tsx
 * <Menu
 *   trigger={<Button>Options</Button>}
 *   items={[
 *     { label: 'Edit', action: () => console.log('Edit') },
 *     { label: 'Delete', action: () => console.log('Delete') },
 *   ]}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/menu
 */
export function Menu(props: IMenuProps) {
  const {
    items,
    trigger,
    placement = 'bottom',
    isOpen: controlledIsOpen,
    onOpenChange,
    ...restProps
  } = props

  const [internalIsOpen, setInternalIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const handleToggle = () => {
    const newValue = !isOpen
    if (!isControlled) {
      setInternalIsOpen(newValue)
    }
    if (onOpenChange) {
      onOpenChange(newValue)
    }
  }

  const handleItemClick = (item: IMenuItem) => {
    if (item.disabled) {
      return
    }
    if (item.action) {
      item.action()
    }
    if (!isControlled) {
      setInternalIsOpen(false)
    }
    if (onOpenChange) {
      onOpenChange(false)
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        triggerRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        if (!isControlled) {
          setInternalIsOpen(false)
        }
        if (onOpenChange) {
          onOpenChange(false)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, isControlled, onOpenChange])

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('menu-container')],
  })

  return (
    <div {...commonProps} {...finalRestProps}>
      <div
        ref={triggerRef}
        onClick={handleToggle}
        className={prefixClass('menu-trigger')}
      >
        {trigger}
      </div>
      {isOpen && (
        <div
          ref={menuRef}
          className={`${prefixClass('menu')} ${prefixClass(`menu-${placement}`)}`}
        >
          {items.map((item, index) => (
            <div
              key={item.id || index}
              className={`${prefixClass('menu-item')} ${item.disabled ? prefixClass('menu-item-disabled') : ''}`}
              onClick={() => handleItemClick(item)}
            >
              {item.icon && <span className={prefixClass('menu-item-icon')}>{item.icon}</span>}
              <span className={prefixClass('menu-item-label')}>{item.label}</span>
              {item.submenu && <span className={prefixClass('menu-item-arrow')}>›</span>}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}


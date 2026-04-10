import {
  cloneElement,
  isValidElement,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactElement,
  type MouseEvent as ReactMouseEvent,
  type ReactNode,
} from 'react'
import type { IBaseComponent } from '@/types'
import { clsx, standardizeProps, prefixClass } from '@/common'

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

type TriggerElementProps = {
  id?: string
  role?: string
  tabIndex?: number
  className?: string
  'aria-haspopup'?: 'menu'
  'aria-expanded'?: boolean
  'aria-controls'?: string
  onClick?: (event: ReactMouseEvent<HTMLElement>) => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
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
  const [focusedItemIndex, setFocusedItemIndex] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([])
  const pendingFocusIndexRef = useRef<number | null>(null)
  const restoreFocusRef = useRef(false)
  const baseId = useId().replace(/:/g, '')
  const triggerId = `${baseId}-trigger`
  const menuId = `${baseId}-menu`

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const findNextEnabledIndex = (startIndex: number, direction: 1 | -1) => {
    if (!items.length) {
      return -1
    }

    for (let offset = 1; offset <= items.length; offset += 1) {
      const nextIndex = (startIndex + direction * offset + items.length) % items.length
      if (!items[nextIndex]?.disabled) {
        return nextIndex
      }
    }

    return -1
  }

  const focusItem = (index: number) => {
    if (index < 0) {
      return
    }

    setFocusedItemIndex(index)
    itemRefs.current[index]?.focus()
  }

  const focusTrigger = () => {
    document.getElementById(triggerId)?.focus()
  }

  const openMenu = (focusIndex?: number) => {
    pendingFocusIndexRef.current = focusIndex ?? findNextEnabledIndex(-1, 1)
    restoreFocusRef.current = false

    if (!isControlled) {
      setInternalIsOpen(true)
    }

    onOpenChange?.(true)
  }

  const closeMenu = (restoreFocus = false) => {
    pendingFocusIndexRef.current = null
    restoreFocusRef.current = restoreFocus

    if (!isControlled) {
      setInternalIsOpen(false)
    }

    onOpenChange?.(false)
  }

  const toggleMenu = () => {
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }

  const handleItemClick = (item: IMenuItem) => {
    if (item.disabled) {
      return
    }
    if (item.action) {
      item.action()
    }

    closeMenu(true)
  }

  const handleMenuItemKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown': {
        event.preventDefault()
        const nextIndex = findNextEnabledIndex(index, 1)
        focusItem(nextIndex)
        break
      }
      case 'ArrowUp': {
        event.preventDefault()
        const nextIndex = findNextEnabledIndex(index, -1)
        focusItem(nextIndex)
        break
      }
      case 'Home': {
        event.preventDefault()
        focusItem(findNextEnabledIndex(-1, 1))
        break
      }
      case 'End': {
        event.preventDefault()
        focusItem(findNextEnabledIndex(0, -1))
        break
      }
      case 'Escape': {
        event.preventDefault()
        closeMenu(true)
        break
      }
      case 'Enter':
      case ' ': {
        event.preventDefault()
        handleItemClick(items[index])
        break
      }
      case 'Tab':
        closeMenu(false)
        break
      default:
        break
    }
  }

  const handleTriggerKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        if (isOpen) {
          focusItem(focusedItemIndex >= 0 ? findNextEnabledIndex(focusedItemIndex, 1) : findNextEnabledIndex(-1, 1))
        } else {
          openMenu(findNextEnabledIndex(-1, 1))
        }
        break
      case 'ArrowUp':
        event.preventDefault()
        if (isOpen) {
          focusItem(focusedItemIndex >= 0 ? findNextEnabledIndex(focusedItemIndex, -1) : findNextEnabledIndex(0, -1))
        } else {
          openMenu(findNextEnabledIndex(0, -1))
        }
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        toggleMenu()
        break
      case 'Escape':
        if (isOpen) {
          event.preventDefault()
          closeMenu(false)
        }
        break
      default:
        break
    }
  }

  // Close menu when clicking outside
  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleClickOutside = (event: MouseEvent) => {
      const triggerElement = document.getElementById(triggerId)

      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        triggerElement &&
        !triggerElement.contains(event.target as Node)
      ) {
        closeMenu(true)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) {
      setFocusedItemIndex(-1)
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false
        focusTrigger()
      }
      return
    }

    const nextFocusIndex = pendingFocusIndexRef.current ?? findNextEnabledIndex(-1, 1)
    pendingFocusIndexRef.current = null
    focusItem(nextFocusIndex)
  }, [isOpen, items])

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('menu-container')],
  })

  const renderTrigger = () => {
    const triggerProps = {
      id: triggerId,
      role: 'button' as const,
      tabIndex: 0,
      'aria-haspopup': 'menu' as const,
      'aria-expanded': isOpen,
      'aria-controls': menuId,
      onClick: toggleMenu,
      onKeyDown: handleTriggerKeyDown,
      className: prefixClass('menu-trigger'),
    }

    if (isValidElement(trigger)) {
      const triggerElement = trigger as ReactElement<TriggerElementProps>
      const existingProps = triggerElement.props

      return cloneElement<TriggerElementProps>(triggerElement, {
        ...triggerProps,
        className: clsx(existingProps.className, triggerProps.className),
        onClick: (event: ReactMouseEvent<HTMLElement>) => {
          existingProps.onClick?.(event)
          if (!event.defaultPrevented) {
            toggleMenu()
          }
        },
        onKeyDown: (event: KeyboardEvent<HTMLElement>) => {
          existingProps.onKeyDown?.(event)
          if (!event.defaultPrevented) {
            triggerProps.onKeyDown(event)
          }
        },
      })
    }

    return (
      <button {...triggerProps} type="button">
        {trigger}
      </button>
    )
  }

  return (
    <div {...commonProps} {...finalRestProps}>
      {renderTrigger()}
      {isOpen && (
        <div
          id={menuId}
          ref={menuRef}
          className={`${prefixClass('menu')} ${prefixClass(`menu-${placement}`)}`}
          role="menu"
          aria-labelledby={triggerId}
        >
          {items.map((item, index) => (
            <button
              key={item.id || index}
              ref={(node) => {
                itemRefs.current[index] = node
              }}
              type="button"
              role="menuitem"
              className={clsx(
                prefixClass('menu-item'),
                item.disabled && prefixClass('menu-item-disabled'),
                index === focusedItemIndex && prefixClass('menu-item-focused')
              )}
              tabIndex={index === focusedItemIndex ? 0 : -1}
              disabled={item.disabled}
              aria-disabled={item.disabled || undefined}
              onClick={() => handleItemClick(item)}
              onKeyDown={(event) => handleMenuItemKeyDown(event, index)}
              onFocus={() => setFocusedItemIndex(index)}
            >
              {item.icon && <span className={prefixClass('menu-item-icon')} aria-hidden="true">{item.icon}</span>}
              <span className={prefixClass('menu-item-label')}>{item.label}</span>
              {item.submenu && <span className={prefixClass('menu-item-arrow')} aria-hidden="true">›</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ComponentRef,
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
   * Optional section label shown before this item when the section changes.
   */
  section?: string
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
   * Whether the item represents a destructive action.
   */
  destructive?: boolean
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

type MenuButtonElement = ComponentRef<'button'>

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
  const [activeSubmenuIndex, setActiveSubmenuIndex] = useState<number | null>(null)
  const [focusedSubmenuIndex, setFocusedSubmenuIndex] = useState(-1)
  const menuRef = useRef<HTMLDivElement>(null)
  const submenuRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<Array<MenuButtonElement | null>>([])
  const submenuItemRefs = useRef<Array<MenuButtonElement | null>>([])
  const pendingFocusIndexRef = useRef<number | null>(null)
  const pendingSubmenuFocusIndexRef = useRef<number | null>(null)
  const restoreFocusRef = useRef(false)
  const baseId = useId().replace(/:/g, '')
  const triggerId = `${baseId}-trigger`
  const menuId = `${baseId}-menu`

  const isControlled = controlledIsOpen !== undefined
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen

  const findNextEnabledIndexForItems = useCallback((targetItems: IMenuItem[], startIndex: number, direction: 1 | -1) => {
    if (!targetItems.length) {
      return -1
    }

    for (let offset = 1; offset <= targetItems.length; offset += 1) {
      const nextIndex = (startIndex + direction * offset + targetItems.length) % targetItems.length
      if (!targetItems[nextIndex]?.disabled) {
        return nextIndex
      }
    }

    return -1
  }, [])

  const findNextEnabledIndex = useCallback((startIndex: number, direction: 1 | -1) => {
    return findNextEnabledIndexForItems(items, startIndex, direction)
  }, [findNextEnabledIndexForItems, items])

  const focusItem = useCallback((index: number) => {
    if (index < 0) {
      return
    }

    setFocusedItemIndex(index)
    itemRefs.current[index]?.focus()
  }, [])

  const focusSubmenuItem = useCallback((index: number) => {
    if (index < 0) {
      return
    }

    setFocusedSubmenuIndex(index)
    submenuItemRefs.current[index]?.focus()
  }, [])

  const focusTrigger = useCallback(() => {
    document.getElementById(triggerId)?.focus()
  }, [triggerId])

  const openMenu = useCallback((focusIndex?: number) => {
    pendingFocusIndexRef.current = focusIndex ?? findNextEnabledIndex(-1, 1)
    pendingSubmenuFocusIndexRef.current = null
    restoreFocusRef.current = false
    setActiveSubmenuIndex(null)
    setFocusedSubmenuIndex(-1)

    if (!isControlled) {
      setInternalIsOpen(true)
    }

    onOpenChange?.(true)
  }, [findNextEnabledIndex, isControlled, onOpenChange])

  const closeMenu = useCallback((restoreFocus = false) => {
    pendingFocusIndexRef.current = null
    pendingSubmenuFocusIndexRef.current = null
    restoreFocusRef.current = restoreFocus
    setActiveSubmenuIndex(null)
    setFocusedSubmenuIndex(-1)

    if (!isControlled) {
      setInternalIsOpen(false)
    }

    onOpenChange?.(false)
  }, [isControlled, onOpenChange])

  const toggleMenu = useCallback(() => {
    if (isOpen) {
      closeMenu()
    } else {
      openMenu()
    }
  }, [closeMenu, isOpen, openMenu])

  const handleItemClick = useCallback((item: IMenuItem) => {
    if (item.disabled) {
      return
    }
    if (item.submenu?.length) {
      return
    }
    if (item.action) {
      item.action()
    }

    closeMenu(true)
  }, [closeMenu])

  const handleMenuItemKeyDown = (event: KeyboardEvent<MenuButtonElement>, index: number) => {
    const submenu = items[index]?.submenu ?? []

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
        if (submenu.length > 0) {
          setActiveSubmenuIndex(index)
          pendingSubmenuFocusIndexRef.current = findNextEnabledIndexForItems(submenu, -1, 1)
        } else {
          handleItemClick(items[index])
        }
        break
      }
      case 'ArrowRight': {
        if (submenu.length > 0) {
          event.preventDefault()
          setActiveSubmenuIndex(index)
          pendingSubmenuFocusIndexRef.current = findNextEnabledIndexForItems(submenu, -1, 1)
        }
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
  }, [closeMenu, isOpen, triggerId])

  useEffect(() => {
    if (!isOpen) {
      setFocusedItemIndex(-1)
      setActiveSubmenuIndex(null)
      setFocusedSubmenuIndex(-1)
      if (restoreFocusRef.current) {
        restoreFocusRef.current = false
        focusTrigger()
      }
      return
    }

    const nextFocusIndex = pendingFocusIndexRef.current ?? findNextEnabledIndex(-1, 1)
    pendingFocusIndexRef.current = null
    focusItem(nextFocusIndex)
  }, [findNextEnabledIndex, focusItem, focusTrigger, isOpen])

  const activeSubmenuItems = useMemo(
    () => (activeSubmenuIndex === null ? [] : (items[activeSubmenuIndex]?.submenu ?? [])),
    [activeSubmenuIndex, items],
  )

  const groupedItems = useMemo(() => {
    let previousSection: string | undefined

    return items.map((item, index) => {
      const showSectionLabel = item.section !== undefined && item.section !== previousSection
      const showSeparator = index > 0 && showSectionLabel
      previousSection = item.section

      return {
        item,
        index,
        showSectionLabel,
        showSeparator,
        sectionId: item.section ? `${menuId}-section-${index}` : undefined,
      }
    })
  }, [items, menuId])

  useEffect(() => {
    if (!isOpen || activeSubmenuIndex === null) {
      setFocusedSubmenuIndex(-1)
      return
    }

    const nextFocusIndex = pendingSubmenuFocusIndexRef.current ?? findNextEnabledIndexForItems(activeSubmenuItems, -1, 1)
    pendingSubmenuFocusIndexRef.current = null
    focusSubmenuItem(nextFocusIndex)
  }, [activeSubmenuIndex, activeSubmenuItems, findNextEnabledIndexForItems, focusSubmenuItem, isOpen])

  const handleSubmenuItemKeyDown = (event: KeyboardEvent<MenuButtonElement>, index: number) => {
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault()
        focusSubmenuItem(findNextEnabledIndexForItems(activeSubmenuItems, index, 1))
        break
      case 'ArrowUp':
        event.preventDefault()
        focusSubmenuItem(findNextEnabledIndexForItems(activeSubmenuItems, index, -1))
        break
      case 'ArrowLeft':
        event.preventDefault()
        setActiveSubmenuIndex(null)
        setFocusedSubmenuIndex(-1)
        if (activeSubmenuIndex !== null) {
          focusItem(activeSubmenuIndex)
        }
        break
      case 'Escape':
        event.preventDefault()
        closeMenu(true)
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        activeSubmenuItems[index]?.action?.()
        closeMenu(true)
        break
      default:
        break
    }
  }

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
          {groupedItems.map(({ item, index, showSectionLabel, showSeparator, sectionId }) => (
            <div key={item.id || index} className={prefixClass('menu-entry')}>
              {showSeparator ? <div className={prefixClass('menu-separator')} role="separator" /> : null}
              {showSectionLabel && sectionId ? (
                <div id={sectionId} className={prefixClass('menu-section-label')}>
                  {item.section}
                </div>
              ) : null}
              <button
                ref={(node) => {
                  itemRefs.current[index] = node
                }}
                type="button"
                role="menuitem"
                className={clsx(
                  prefixClass('menu-item'),
                  item.disabled && prefixClass('menu-item-disabled'),
                  item.destructive && prefixClass('menu-item-destructive'),
                  index === focusedItemIndex && prefixClass('menu-item-focused')
                )}
                tabIndex={index === focusedItemIndex ? 0 : -1}
                disabled={item.disabled}
                aria-disabled={item.disabled || undefined}
                aria-describedby={showSectionLabel ? sectionId : undefined}
                aria-expanded={item.submenu?.length ? activeSubmenuIndex === index : undefined}
                aria-haspopup={item.submenu?.length ? 'menu' : undefined}
                data-destructive={item.destructive ? 'true' : undefined}
                onClick={() => handleItemClick(item)}
                onKeyDown={(event) => handleMenuItemKeyDown(event, index)}
                onFocus={() => {
                  setFocusedItemIndex(index)
                  if (item.submenu?.length) {
                    setActiveSubmenuIndex(index)
                  } else {
                    setActiveSubmenuIndex(null)
                  }
                }}
                onMouseEnter={() => {
                  if (item.submenu?.length) {
                    setActiveSubmenuIndex(index)
                  }
                }}
              >
                {item.icon && <span className={prefixClass('menu-item-icon')} aria-hidden="true">{item.icon}</span>}
                <span className={prefixClass('menu-item-label')}>{item.label}</span>
                {item.submenu && <span className={prefixClass('menu-item-arrow')} aria-hidden="true">›</span>}
              </button>
            </div>
          ))}
          {activeSubmenuIndex !== null && activeSubmenuItems.length > 0 ? (
            <div
              ref={submenuRef}
              className={`${prefixClass('menu')} ${prefixClass('menu-submenu')} ${prefixClass('menu-right')}`}
              role="menu"
              aria-label={items[activeSubmenuIndex]?.label}
            >
              {activeSubmenuItems.map((item, index) => (
                <button
                  key={item.id || `${activeSubmenuIndex}-${index}`}
                  ref={(node) => {
                    submenuItemRefs.current[index] = node
                  }}
                  type="button"
                  role="menuitem"
                  className={clsx(
                    prefixClass('menu-item'),
                    item.disabled && prefixClass('menu-item-disabled'),
                    index === focusedSubmenuIndex && prefixClass('menu-item-focused')
                  )}
                  tabIndex={index === focusedSubmenuIndex ? 0 : -1}
                  disabled={item.disabled}
                  aria-disabled={item.disabled || undefined}
                  onClick={() => {
                    if (item.disabled) {
                      return
                    }

                    item.action?.()
                    closeMenu(true)
                  }}
                  onKeyDown={(event) => handleSubmenuItemKeyDown(event, index)}
                  onFocus={() => setFocusedSubmenuIndex(index)}
                >
                  {item.icon && <span className={prefixClass('menu-item-icon')} aria-hidden="true">{item.icon}</span>}
                  <span className={prefixClass('menu-item-label')}>{item.label}</span>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

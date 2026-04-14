import {
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ComponentRef,
  type MouseEvent as ReactMouseEvent,
  type ReactElement,
  type ReactNode,
} from 'react'

import { clsx, prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IContextMenuItem {
  /**
   * Label shown for the menu item.
   */
  label: string
  /**
   * Optional icon displayed before the label.
   */
  icon?: ReactNode
  /**
   * Invoked when the item is selected.
   */
  action?: () => void
  /**
   * Visual role of the item.
   *
   * @default 'default'
   */
  style?: 'default' | 'destructive'
  /**
   * Whether the item is disabled.
   */
  disabled?: boolean
}

export interface IContextMenuProps extends IBaseComponent {
  /**
   * Menu items.
   */
  items: IContextMenuItem[]
  /**
   * Trigger content that receives the context-menu interaction.
   */
  children: ReactElement
}

type MenuPosition = {
  left: number
  top: number
}

type ContextMenuTriggerProps = {
  onContextMenu?: (event: ReactMouseEvent<HTMLElement>) => void
}

/**
 * A menu of contextual actions presented from a right-click interaction.
 */
export function ContextMenu(props: IContextMenuProps) {
  const { children, items, ...restProps } = props
  const [isOpen, setIsOpen] = useState(false)
  const [position, setPosition] = useState<MenuPosition>({ left: 0, top: 0 })
  const menuId = useId().replace(/:/g, '')
  const triggerRef = useRef<HTMLElement | null>(null)
  const itemRefs = useRef<Array<ComponentRef<'button'> | null>>([])

  const enabledItemIndexes = useMemo(
    () =>
      items.reduce<number[]>((result, item, index) => {
        if (!item.disabled) {
          result.push(index)
        }

        return result
      }, []),
    [items],
  )

  const focusItem = useCallback((index: number) => {
    itemRefs.current[index]?.focus()
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
    triggerRef.current?.focus()
  }, [])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null
      const menuElement = document.getElementById(menuId)

      if (target && menuElement?.contains(target)) {
        return
      }

      closeMenu()
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeMenu()
      }
    }

    document.addEventListener('mousedown', handlePointerDown)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeMenu, isOpen, menuId])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const firstEnabledIndex = enabledItemIndexes[0]

    if (firstEnabledIndex !== undefined) {
      focusItem(firstEnabledIndex)
    }
  }, [enabledItemIndexes, focusItem, isOpen])

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('context-menu'),
    style: {
      left: `${position.left}px`,
      top: `${position.top}px`,
    } satisfies CSSProperties,
  })

  const trigger = useMemo(() => {
    if (!isValidElement<ContextMenuTriggerProps>(children)) {
      return <span>{children}</span>
    }

    return cloneElement<ContextMenuTriggerProps>(children as ReactElement<ContextMenuTriggerProps>, {
      onContextMenu: (event: ReactMouseEvent<HTMLElement>) => {
        children.props.onContextMenu?.(event)
        if (event.defaultPrevented) {
          return
        }

        event.preventDefault()
        triggerRef.current = event.currentTarget
        setPosition({ left: event.clientX, top: event.clientY })
        setIsOpen(true)
      },
    })
  }, [children])

  return (
    <>
      {trigger}
      {isOpen ? (
        <div
          {...commonProps}
          {...finalRestProps}
          id={menuId}
          role="menu"
          onKeyDown={(event) => {
            const currentIndex = itemRefs.current.findIndex((item) => item === document.activeElement)

            if (currentIndex === -1 || enabledItemIndexes.length === 0) {
              return
            }

            const enabledPosition = enabledItemIndexes.indexOf(currentIndex)

            if (enabledPosition === -1) {
              return
            }

            if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
              event.preventDefault()
              const nextPosition =
                event.key === 'ArrowDown'
                  ? (enabledPosition + 1) % enabledItemIndexes.length
                  : (enabledPosition - 1 + enabledItemIndexes.length) % enabledItemIndexes.length
              focusItem(enabledItemIndexes[nextPosition]!)
            }

            if (event.key === 'Home') {
              event.preventDefault()
              focusItem(enabledItemIndexes[0]!)
            }

            if (event.key === 'End') {
              event.preventDefault()
              focusItem(enabledItemIndexes[enabledItemIndexes.length - 1]!)
            }
          }}
        >
          {items.map((item, index) => (
            <button
              key={`${item.label}-${index}`}
              className={clsx(
                prefixClass('context-menu-item'),
                item.disabled && prefixClass('context-menu-item-disabled'),
                item.style === 'destructive' && prefixClass('context-menu-item-destructive'),
              )}
              disabled={item.disabled}
              ref={(element) => {
                itemRefs.current[index] = element
              }}
              onClick={() => {
                if (item.disabled) {
                  return
                }

                item.action?.()
                closeMenu()
              }}
              role="menuitem"
              type="button"
            >
              {item.icon ? <span className={prefixClass('context-menu-item-icon')}>{item.icon}</span> : null}
              <span className={prefixClass('context-menu-item-label')}>{item.label}</span>
            </button>
          ))}
        </div>
      ) : null}
    </>
  )
}

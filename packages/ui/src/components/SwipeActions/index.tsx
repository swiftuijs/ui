import {
  isValidElement,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from 'react'

import { clsx, prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface ISwipeActionItem {
  label: string
  action?: () => void
  icon?: ReactNode
  disabled?: boolean
  role?: ComponentPropsWithoutRef<'button'>['type']
  tint?: 'default' | 'destructive'
}

export interface ISwipeActionsProps extends IBaseComponent {
  actions: ISwipeActionItem[]
  edge?: 'leading' | 'trailing'
  open?: boolean
  defaultOpen?: boolean
  onOpenChange?: (open: boolean) => void
}

function getNodeText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') {
    return String(node)
  }

  if (Array.isArray(node)) {
    return node.map(getNodeText).join(' ').trim()
  }

  if (isValidElement(node)) {
    return getNodeText((node.props as { children?: ReactNode }).children)
  }

  return ''
}

/**
 * SwipeActions adapts SwiftUI's swipe-revealed row actions into an explicit,
 * accessible web row wrapper.
 */
export function SwipeActions(props: ISwipeActionsProps) {
  const {
    actions,
    children,
    edge = 'trailing',
    open,
    defaultOpen = false,
    onOpenChange,
    ...restProps
  } = props
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const rootRef = useRef<HTMLDivElement>(null)
  const isControlled = open !== undefined
  const isOpen = isControlled ? open : internalOpen
  const rowLabel = getNodeText(children).replace(/\s+/g, ' ').trim() || 'row'

  const setOpen = useCallback((nextOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(nextOpen)
    }

    onOpenChange?.(nextOpen)
  }, [isControlled, onOpenChange])

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('swipe-actions'),
      prefixClass(`swipe-actions-${edge}`),
      isOpen && prefixClass('swipe-actions-open'),
    ],
  })

  useEffect(() => {
    if (!isOpen) {
      return
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
      }
    }

    const handlePointerDown = (event: globalThis.MouseEvent | globalThis.PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('pointerdown', handlePointerDown)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('pointerdown', handlePointerDown)
    }
  }, [isOpen, setOpen])

  return (
    <div {...commonProps} {...finalRestProps} ref={rootRef}>
      <button
        aria-expanded={isOpen}
        aria-label={`${isOpen ? 'Hide' : 'Show'} actions for ${rowLabel}`}
        className={prefixClass('swipe-actions-toggle')}
        onClick={() => setOpen(!isOpen)}
        type="button"
      >
        {isOpen ? 'Hide actions' : 'Show actions'}
      </button>
      <div className={prefixClass('swipe-actions-row')}>
        {edge === 'leading' && isOpen ? (
          <div aria-label="Swipe actions" className={prefixClass('swipe-actions-panel')} data-edge={edge} role="group">
            {actions.map((item) => (
              <button
                key={item.label}
                className={clsx(
                  prefixClass('swipe-actions-button'),
                  item.tint === 'destructive' && prefixClass('swipe-actions-button-destructive'),
                )}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) {
                    return
                  }

                  item.action?.()
                  setOpen(false)
                }}
                type="button"
              >
                {item.icon ? <span className={prefixClass('swipe-actions-button-icon')}>{item.icon}</span> : null}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : null}
        <div className={prefixClass('swipe-actions-content')}>{children}</div>
        {edge === 'trailing' && isOpen ? (
          <div aria-label="Swipe actions" className={prefixClass('swipe-actions-panel')} data-edge={edge} role="group">
            {actions.map((item) => (
              <button
                key={item.label}
                className={clsx(
                  prefixClass('swipe-actions-button'),
                  item.tint === 'destructive' && prefixClass('swipe-actions-button-destructive'),
                )}
                disabled={item.disabled}
                onClick={() => {
                  if (item.disabled) {
                    return
                  }

                  item.action?.()
                  setOpen(false)
                }}
                type="button"
              >
                {item.icon ? <span className={prefixClass('swipe-actions-button-icon')}>{item.icon}</span> : null}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  )
}

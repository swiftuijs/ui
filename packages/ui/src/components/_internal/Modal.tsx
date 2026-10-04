'use client'

import { useUIConfig, themeStyle } from '@/contexts/ui-config'
import * as Dialog from '@radix-ui/react-dialog'
import { forwardRef, useCallback, useRef, type ComponentPropsWithoutRef } from 'react'


interface ModalProps extends ComponentPropsWithoutRef<typeof Dialog.Content> {
  open: boolean
  onDismiss?: () => void
  dismissOnEscape?: boolean
  dismissOnBackdrop?: boolean
  overlayClassName: string
  accessibleTitle?: string
  hasDescription?: boolean
}

/** Shared modal behavior; callers own presentation and content. */
export const Modal = forwardRef<HTMLDivElement, ModalProps>(function Modal({
  open,
  onDismiss,
  dismissOnEscape = true,
  dismissOnBackdrop = true,
  overlayClassName,
  accessibleTitle,
  hasDescription = false,
  children,
  ...contentProps
}, ref) {
  const contentAttributes = { ...contentProps }
  if (!contentAttributes['aria-labelledby']) {
    if (contentAttributes['aria-label']) contentAttributes['aria-labelledby'] = undefined
    else delete contentAttributes['aria-labelledby']
  }
  const appearance = useUIConfig()
  const returnFocus = useRef<HTMLElement | null>(null)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const setContentRef = useCallback((node: HTMLDivElement | null) => {
    contentRef.current = node
    if (typeof ref === 'function') ref(node)
    else if (ref) ref.current = node
  }, [ref])

  return (
    <Dialog.Root open={open} onOpenChange={nextOpen => { if (!nextOpen) onDismiss?.() }}>
      <Dialog.Portal>
        <Dialog.Overlay
          className={overlayClassName}
          {...(appearance.theme ? { 'data-theme': appearance.theme } : {})}
          style={themeStyle(appearance)}
          role="presentation"
          onClick={event => {
            if (dismissOnBackdrop && event.target === event.currentTarget) onDismiss?.()
          }}
        />
        <Dialog.Content
          {...(hasDescription ? {} : { 'aria-describedby': undefined })}
          {...contentAttributes}
          {...(appearance.theme ? { 'data-theme': appearance.theme } : {})}
          style={{ color: 'var(--sw-color-label-primary)', ...themeStyle(appearance), ...contentAttributes.style }}
          ref={setContentRef}
          aria-hidden={!open || undefined}
          onOpenAutoFocus={() => { returnFocus.current = document.activeElement as HTMLElement | null }}
          onCloseAutoFocus={event => {
            event.preventDefault()
            if (returnFocus.current?.isConnected) returnFocus.current.focus()
          }}
          onEscapeKeyDown={event => {
            // Let the nested floating surface handle Escape first, including
            // popovers whose keyboard focus may still be on their anchor.
            const floating = contentRef.current?.querySelector('.sw-menu[data-state="open"], .sw-popover[data-state="open"], .sw-context-menu[data-state="open"]')
            if (!dismissOnEscape || floating) event.preventDefault()
          }}
          onPointerDownOutside={event => { event.preventDefault() }}
          onInteractOutside={event => { event.preventDefault() }}
        >
          {accessibleTitle && <Dialog.Title className="sw-visually-hidden">{accessibleTitle}</Dialog.Title>}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
})

export const ModalTitle = Dialog.Title
export const ModalDescription = Dialog.Description

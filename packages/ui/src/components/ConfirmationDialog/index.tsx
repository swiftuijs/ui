import { memo, useEffect, useId } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IConfirmationDialogAction {
  /**
   * Action label shown in the dialog.
   */
  label: string
  /**
   * Invoked when the action is selected.
   */
  action?: () => void
  /**
   * Visual role of the action.
   *
   * @default 'default'
   */
  style?: 'default' | 'cancel' | 'destructive'
}

export interface IConfirmationDialogProps extends IBaseComponent {
  /**
   * Optional title shown above the actions.
   */
  title?: string
  /**
   * Optional supporting message.
   */
  message?: string
  /**
   * Whether the dialog is currently visible.
   */
  isVisible: boolean
  /**
   * Called when the dialog should close.
   */
  onDismiss: () => void
  /**
   * Available actions.
   */
  actions: IConfirmationDialogAction[]
}

/**
 * A view that presents a confirmation dialog of actions.
 *
 * ConfirmationDialog mirrors SwiftUI's confirmationDialog by presenting
 * a stacked list of actions with cancel and destructive affordances.
 */
export const ConfirmationDialog = memo(function ConfirmationDialog(props: IConfirmationDialogProps) {
  const { title, message, isVisible, onDismiss, actions, ...restProps } = props

  const titleId = useId().replace(/:/g, '')
  const descriptionId = useId().replace(/:/g, '')

  useEffect(() => {
    if (!isVisible) {
      return
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isVisible, onDismiss])

  if (!isVisible) {
    return null
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('confirmation-dialog'),
  })

  return (
    <>
      <div className={prefixClass('confirmation-dialog-backdrop')} onClick={onDismiss} />
      <div
        {...commonProps}
        {...finalRestProps}
        aria-describedby={message ? descriptionId : undefined}
        aria-labelledby={title ? titleId : undefined}
        aria-modal="true"
        role="dialog"
      >
        <div className={prefixClass('confirmation-dialog-content')}>
          {(title || message) ? (
            <div className={prefixClass('confirmation-dialog-header')}>
              {title ? (
                <div className={prefixClass('confirmation-dialog-title')} id={titleId}>
                  {title}
                </div>
              ) : null}
              {message ? (
                <div className={prefixClass('confirmation-dialog-message')} id={descriptionId}>
                  {message}
                </div>
              ) : null}
            </div>
          ) : null}
          <div className={prefixClass('confirmation-dialog-actions')}>
            {actions.map((action, index) => (
              <button
                key={`${action.label}-${index}`}
                type="button"
                className={[
                  prefixClass('confirmation-dialog-button'),
                  prefixClass(`confirmation-dialog-button-${action.style ?? 'default'}`),
                ].join(' ')}
                onClick={() => {
                  action.action?.()
                  onDismiss()
                }}
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
})

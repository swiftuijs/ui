import { memo, useEffect, useId } from 'react'
import type { IBaseComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A container that presents an alert dialog.
 * 
 * Alert displays a modal dialog with a message and optional action buttons.
 * 
 * @example
 * ```tsx
 * <Alert
 *   title="Alert"
 *   message="This is an alert message"
 *   isVisible={showAlert}
 *   onDismiss={() => setShowAlert(false)}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/alert
 */
export interface IAlertButton {
  /**
   * The label text for the button.
   */
  label: string
  /**
   * The action to perform when the button is pressed.
   */
  action: () => void
  /**
   * The style of the button.
   * 
   * @default 'default'
   */
  style?: 'default' | 'cancel' | 'destructive'
}

export interface IAlertProps extends IBaseComponent {
  /**
   * The title of the alert.
   */
  title: string
  /**
   * The message body of the alert.
   */
  message?: string
  /**
   * Whether the alert is visible.
   */
  isVisible: boolean
  /**
   * Callback fired when the alert should be dismissed.
   */
  onDismiss: () => void
  /**
   * The buttons to display in the alert.
   */
  buttons?: IAlertButton[]
}

export const Alert = memo(function Alert(props: IAlertProps) {
  const {
    title,
    message,
    isVisible,
    onDismiss,
    buttons = [{ label: 'OK', action: onDismiss }],
    ...restProps
  } = props

  const titleId = useId().replace(/:/g, '')
  const descriptionId = useId().replace(/:/g, '')

  // Match native alert dismissal expectations on web keyboards.
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

  if (!isVisible) return null

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('alert')
  })

  return (
    <>
      <div className={prefixClass('alert-backdrop')} onClick={onDismiss} />
      <div
        {...commonProps}
        {...finalRestProps}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={message ? descriptionId : undefined}
      >
        <div className={prefixClass('alert-content')}>
          <div id={titleId} className={prefixClass('alert-title')}>{title}</div>
          {message && <div id={descriptionId} className={prefixClass('alert-message')}>{message}</div>}
          <div className={prefixClass('alert-actions')}>
            {buttons.map((button, index) => (
              <button
                key={index}
                type="button"
                className={[
                  prefixClass('alert-button'),
                  prefixClass(`alert-button-${button.style || 'default'}`)
                ].join(' ')}
                onClick={button.action}
              >
                {button.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
})

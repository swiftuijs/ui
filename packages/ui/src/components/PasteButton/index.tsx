import { memo } from 'react'

import type { IBaseElementComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A button that reads plain text from the clipboard.
 *
 * @see https://developer.apple.com/documentation/swiftui/pastebutton
 */
export interface IPasteButtonProps extends Omit<IBaseElementComponent<'button'>, 'type' | 'onPaste'> {
  /**
   * Called with the pasted plain-text content.
   */
  onPaste: (value: string) => void | Promise<void>
}

export const PasteButton = memo(function PasteButton(props: IPasteButtonProps) {
  const { onPaste, onClick, ...restProps } = props
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('pastebutton'),
  })

  return (
    <button
      {...commonProps}
      {...finalRestProps}
      type="button"
      onClick={async (event) => {
        onClick?.(event)
        if (event.defaultPrevented) {
          return
        }

        const value = await globalThis.navigator?.clipboard?.readText?.()
        if (typeof value === 'string') {
          await onPaste(value)
        }
      }}
    >
      {children}
    </button>
  )
})

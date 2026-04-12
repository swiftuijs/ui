import { memo } from 'react'

import type { IBaseElementComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A control that shares content using the host platform's share affordance.
 *
 * @see https://developer.apple.com/documentation/swiftui/sharelink
 */
export interface IShareLinkProps extends Omit<IBaseElementComponent<'button'>, 'type'> {
  /**
   * The item to share. A string URL is treated as the shared URL on the web.
   */
  item: string
  /**
   * Optional subject/title passed to the share sheet.
   */
  subject?: string
  /**
   * Optional supporting message/text passed to the share sheet.
   */
  message?: string
}

async function shareItem(item: string, subject?: string, message?: string) {
  const navigatorObject = globalThis.navigator

  if (navigatorObject && typeof navigatorObject.share === 'function') {
    await navigatorObject.share({
      title: subject,
      text: message,
      url: item,
    })
    return
  }

  if (typeof window !== 'undefined' && /^https?:\/\//.test(item)) {
    window.open(item, '_blank', 'noopener,noreferrer')
    return
  }

  if (navigatorObject?.clipboard?.writeText) {
    await navigatorObject.clipboard.writeText([subject, message, item].filter(Boolean).join('\n'))
  }
}

export const ShareLink = memo(function ShareLink(props: IShareLinkProps) {
  const { item, subject, message, onClick, ...restProps } = props
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('sharelink'),
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
        await shareItem(item, subject, message)
      }}
    >
      {children}
    </button>
  )
})

import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IRedactedProps extends IBaseComponent {
  active?: boolean
  reason?: 'placeholder' | 'privacy'
}

/**
 * Redacted adapts SwiftUI's redaction modifier into an explicit placeholder wrapper.
 */
export const Redacted = memo(function Redacted(props: IRedactedProps) {
  const {
    active = true,
    children,
    reason = 'placeholder',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('redacted'),
      prefixClass(`redacted-${reason}`),
      active && prefixClass('redacted-active'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      aria-busy={active || undefined}
      data-redacted={String(active)}
      data-redaction-reason={reason}
    >
      {children}
    </span>
  )
})

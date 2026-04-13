import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IScrollClipDisabledProps extends IBaseComponent {
  disabled?: boolean
}

/**
 * ScrollClipDisabled adapts SwiftUI's scrollClipDisabled modifier into an explicit wrapper.
 */
export const ScrollClipDisabled = memo(function ScrollClipDisabled(props: IScrollClipDisabledProps) {
  const {
    children,
    disabled = true,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('scrollclipdisabled'),
      disabled && prefixClass('scrollclipdisabled-disabled'),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-scroll-clip-disabled={String(disabled)}
    >
      {children}
    </div>
  )
})

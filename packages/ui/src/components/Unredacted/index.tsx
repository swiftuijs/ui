import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export type IUnredactedProps = IBaseComponent

/**
 * Unredacted adapts SwiftUI's unredacted modifier into an explicit wrapper.
 */
export const Unredacted = memo(function Unredacted(props: IUnredactedProps) {
  const { children, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('unredacted'),
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-redacted="false"
      data-unredacted="true"
    >
      {children}
    </span>
  )
})

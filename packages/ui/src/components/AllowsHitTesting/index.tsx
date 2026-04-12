import { memo, type CSSProperties } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IAllowsHitTestingProps extends IBaseComponent {
  enabled?: boolean
}

/**
 * AllowsHitTesting adapts SwiftUI's allowsHitTesting modifier into an explicit web wrapper.
 */
export const AllowsHitTesting = memo(function AllowsHitTesting(props: IAllowsHitTestingProps) {
  const {
    children,
    enabled = true,
    style,
    ...restProps
  } = props

  const wrapperStyle: CSSProperties = {
    pointerEvents: enabled ? 'auto' : 'none',
    ...style,
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('allowshittesting'),
      !enabled && prefixClass('allowshittesting-disabled'),
    ],
    style: wrapperStyle,
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-hit-testing={String(enabled)}
    >
      {children}
    </span>
  )
})

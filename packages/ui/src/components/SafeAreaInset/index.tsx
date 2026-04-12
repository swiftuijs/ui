import { memo, type ReactNode } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface ISafeAreaInsetProps extends IBaseComponent {
  edge?: 'top' | 'bottom' | 'leading' | 'trailing'
  inset: ReactNode
}

/**
 * SafeAreaInset adapts SwiftUI's safe-area inset modifier into an explicit container.
 */
export const SafeAreaInset = memo(function SafeAreaInset(props: ISafeAreaInsetProps) {
  const { children, edge = 'bottom', inset, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('safe-area-inset'),
      prefixClass(`safe-area-inset-${edge}`),
    ],
  })

  const insetNode = (
    <aside className={prefixClass('safe-area-inset-slot')} data-edge={edge} role="complementary">
      {inset}
    </aside>
  )

  return (
    <div {...commonProps} {...finalRestProps}>
      {edge === 'top' || edge === 'leading' ? insetNode : null}
      <div className={prefixClass('safe-area-inset-content')}>{children}</div>
      {edge === 'bottom' || edge === 'trailing' ? insetNode : null}
    </div>
  )
})

import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface ISymbolEffectProps extends IBaseComponent {
  effect?: 'pulse' | 'bounce' | 'appear'
  isActive?: boolean
}

/**
 * An adapted wrapper for SwiftUI-style symbol effects.
 */
export const SymbolEffect = memo(function SymbolEffect(props: ISymbolEffectProps) {
  const {
    effect = 'pulse',
    isActive = true,
    children,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('symbol-effect'),
      prefixClass(`symbol-effect-${effect}`),
      isActive && prefixClass('symbol-effect-active'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-active={String(isActive)}
      data-effect={effect}
    >
      {children}
    </span>
  )
})

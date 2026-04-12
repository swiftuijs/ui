import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IHoverEffectProps extends IBaseComponent {
  effect?: 'lift' | 'highlight'
  disabled?: boolean
}

/**
 * HoverEffect adapts SwiftUI's hover feedback modifiers for pointer-capable web UIs.
 */
export const HoverEffect = memo(function HoverEffect(props: IHoverEffectProps) {
  const {
    children,
    disabled = false,
    effect = 'highlight',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('hovereffect'),
      prefixClass(`hovereffect-${effect}`),
      disabled && prefixClass('hovereffect-disabled'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-disabled={String(disabled)}
      data-effect={effect}
    >
      {children}
    </span>
  )
})

import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IVisualEffectProps extends IBaseComponent {
  effect?: 'subtle' | 'prominent'
  shape?: 'automatic' | 'rounded' | 'capsule'
  active?: boolean
}

/**
 * VisualEffect adapts SwiftUI's visual-effect modifiers into an explicit surface wrapper.
 */
export const VisualEffect = memo(function VisualEffect(props: IVisualEffectProps) {
  const {
    active = true,
    children,
    effect = 'subtle',
    shape = 'automatic',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('visualeffect'),
      prefixClass(`visualeffect-${effect}`),
      prefixClass(`visualeffect-shape-${shape}`),
      active && prefixClass('visualeffect-active'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-active={String(active)}
      data-effect={effect}
      data-shape={shape}
    >
      {children}
    </span>
  )
})

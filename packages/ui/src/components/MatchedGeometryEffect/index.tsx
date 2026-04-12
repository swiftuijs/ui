import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IMatchedGeometryEffectProps extends IBaseComponent {
  id: string
  namespace: string
  role?: 'source' | 'target'
  properties?: 'frame' | 'position' | 'size'
  active?: boolean
}

/**
 * MatchedGeometryEffect adapts SwiftUI's matched-geometry modifier into shared metadata.
 */
export const MatchedGeometryEffect = memo(function MatchedGeometryEffect(props: IMatchedGeometryEffectProps) {
  const {
    active = true,
    children,
    id,
    namespace,
    properties = 'frame',
    role = 'source',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('matchedgeometryeffect'),
      prefixClass(`matchedgeometryeffect-${role}`),
      active && prefixClass('matchedgeometryeffect-active'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-active={String(active)}
      data-geometry-id={id}
      data-geometry-namespace={namespace}
      data-geometry-properties={properties}
      data-geometry-role={role}
    >
      {children}
    </span>
  )
})

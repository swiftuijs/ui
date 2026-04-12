import { memo, type CSSProperties } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

type ScenePaddingEdge = 'all' | 'top' | 'bottom' | 'leading' | 'trailing' | 'horizontal' | 'vertical'

export interface IScenePaddingProps extends IBaseComponent {
  edges?: ScenePaddingEdge[]
  size?: 'regular' | 'compact'
}

const edgeVariables: Record<Exclude<ScenePaddingEdge, 'all'>, keyof CSSProperties> = {
  top: 'paddingTop',
  bottom: 'paddingBottom',
  leading: 'paddingInlineStart',
  trailing: 'paddingInlineEnd',
  horizontal: 'paddingInline',
  vertical: 'paddingBlock',
}

/**
 * ScenePadding adapts SwiftUI's scene-level padding modifier into an explicit web wrapper.
 */
export const ScenePadding = memo(function ScenePadding(props: IScenePaddingProps) {
  const {
    children,
    edges = ['all'],
    size = 'regular',
    style,
    ...restProps
  } = props

  const inset = size === 'compact' ? '0.75rem' : '1.25rem'
  const resolvedEdges = edges.length === 0 ? ['all'] : edges
  const paddingStyle: CSSProperties = resolvedEdges.includes('all')
    ? { padding: inset }
    : resolvedEdges.reduce<CSSProperties>((acc, edge) => {
      if (edge === 'all') {
        return acc
      }
      const property = edgeVariables[edge as Exclude<ScenePaddingEdge, 'all'>]
      ;(acc as Record<string, string>)[property] = inset
      return acc
    }, {})

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('scenepadding'),
      prefixClass(`scenepadding-${size}`),
    ],
    style: {
      ...paddingStyle,
      ...style,
    },
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-scene-padding-edges={resolvedEdges.join(',')}
      data-scene-padding-size={size}
    >
      {children}
    </div>
  )
})

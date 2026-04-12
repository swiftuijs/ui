import { memo, type CSSProperties } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

type ContentMarginEdge = 'all' | 'top' | 'bottom' | 'leading' | 'trailing' | 'horizontal' | 'vertical'

export interface IContentMarginsProps extends IBaseComponent {
  edges?: ContentMarginEdge[]
  value?: number | string | 'compact' | 'regular'
}

const edgeVariables: Record<Exclude<ContentMarginEdge, 'all'>, keyof CSSProperties> = {
  top: 'paddingTop',
  bottom: 'paddingBottom',
  leading: 'paddingInlineStart',
  trailing: 'paddingInlineEnd',
  horizontal: 'paddingInline',
  vertical: 'paddingBlock',
}

function normalizeValue(value: IContentMarginsProps['value']) {
  if (value === undefined || value === 'regular') {
    return '1rem'
  }

  if (value === 'compact') {
    return '0.5rem'
  }

  return typeof value === 'number' ? `${value}px` : value
}

/**
 * ContentMargins adapts SwiftUI's contentMargins modifier into an explicit web wrapper.
 */
export const ContentMargins = memo(function ContentMargins(props: IContentMarginsProps) {
  const {
    children,
    edges = ['all'],
    style,
    value = 'regular',
    ...restProps
  } = props

  const inset = normalizeValue(value)
  const resolvedEdges = edges.length === 0 ? ['all'] : edges
  const paddingStyle: CSSProperties = resolvedEdges.includes('all')
    ? { padding: inset }
    : resolvedEdges.reduce<CSSProperties>((acc, edge) => {
      if (edge === 'all') {
        return acc
      }
      const property = edgeVariables[edge as Exclude<ContentMarginEdge, 'all'>]
      ;(acc as Record<string, string>)[property] = inset
      return acc
    }, {})

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('content-margins'),
    style: {
      ...paddingStyle,
      ...style,
    },
  })

  return (
    <div {...commonProps} {...finalRestProps} data-content-margin-edges={resolvedEdges.join(',')}>
      {children}
    </div>
  )
})

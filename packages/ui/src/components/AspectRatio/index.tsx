import { memo, type CSSProperties } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { EAlignment, IBaseComponent } from '@/types'

import './style.scss'

export interface IAspectRatioProps extends IBaseComponent {
  alignment?: EAlignment
  contentMode?: 'fit' | 'fill'
  ratio?: number | [number, number]
}

function normalizeRatio(ratio?: number | [number, number]) {
  if (ratio === undefined) {
    return undefined
  }

  if (typeof ratio === 'number') {
    return Number.isFinite(ratio) && ratio > 0 ? ratio : undefined
  }

  const [width, height] = ratio
  if (!Number.isFinite(width) || !Number.isFinite(height) || width <= 0 || height <= 0) {
    return undefined
  }

  return width / height
}

/**
 * AspectRatio adapts SwiftUI's aspectRatio modifier into a dedicated web wrapper.
 */
export const AspectRatio = memo(function AspectRatio(props: IAspectRatioProps) {
  const {
    alignment = 'center',
    children,
    contentMode = 'fit',
    ratio,
    style,
    ...restProps
  } = props

  const resolvedRatio = normalizeRatio(ratio)
  const aspectStyle: CSSProperties = resolvedRatio
    ? { aspectRatio: String(resolvedRatio) }
    : {}

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('aspectratio'),
      prefixClass(`aspectratio-${contentMode}`),
    ],
    style: {
      ...aspectStyle,
      ...style,
    },
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-alignment={alignment}
      data-content-mode={contentMode}
      data-ratio={resolvedRatio ?? 'intrinsic'}
    >
      <div className={prefixClass('aspectratio-content')}>
        {children}
      </div>
    </div>
  )
})

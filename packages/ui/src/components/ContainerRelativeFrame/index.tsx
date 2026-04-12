import { memo, type CSSProperties } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { EAlignment, IBaseComponent } from '@/types'

import './style.scss'

export interface IContainerRelativeFrameProps extends IBaseComponent {
  alignment?: EAlignment
  axis?: 'horizontal' | 'vertical' | 'both'
  count?: number
  length?: number | string
  spacing?: number
  span?: number
}

function normalizeLength(length: IContainerRelativeFrameProps['length']) {
  if (length === undefined) {
    return null
  }

  return typeof length === 'number' ? `${length}px` : length
}

function buildFrameValue(count: number, span: number, spacing: number) {
  const safeCount = Math.max(count, 1)
  const safeSpan = Math.max(Math.min(span, safeCount), 1)

  return `calc((100% - ${(safeCount - 1) * spacing}px) * ${safeSpan} / ${safeCount} + ${Math.max(safeSpan - 1, 0) * spacing}px)`
}

/**
 * ContainerRelativeFrame adapts SwiftUI's containerRelativeFrame modifier into a CSS-sized wrapper.
 */
export const ContainerRelativeFrame = memo(function ContainerRelativeFrame(props: IContainerRelativeFrameProps) {
  const {
    alignment = 'center',
    axis = 'horizontal',
    children,
    count = 1,
    length,
    spacing = 0,
    span = 1,
    style,
    ...restProps
  } = props

  const frameValue = normalizeLength(length) ?? buildFrameValue(count, span, spacing)
  const frameStyle: CSSProperties = {
    ...style,
  }

  if (axis === 'horizontal' || axis === 'both') {
    frameStyle.width = frameValue
    frameStyle.maxWidth = frameValue
  }

  if (axis === 'vertical' || axis === 'both') {
    frameStyle.height = frameValue
    frameStyle.maxHeight = frameValue
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('container-relative-frame'),
    style: frameStyle,
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-alignment={alignment}
      data-axis={axis}
      data-count={count}
      data-span={span}
      data-spacing={spacing}
    >
      {children}
    </div>
  )
})

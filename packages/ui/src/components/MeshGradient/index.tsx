import { memo } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

export interface IMeshGradientProps extends IBaseComponent {
  colors: string[]
  height: number
  points: Array<[number, number]>
  width: number
}

function buildGradient(colors: string[], points: Array<[number, number]>) {
  return colors
    .map((color, index) => {
      const [x = 0.5, y = 0.5] = points[index] ?? [0.5, 0.5]
      return `radial-gradient(circle at ${x * 100}% ${y * 100}%, ${color} 0%, transparent 58%)`
    })
    .join(', ')
}

/**
 * MeshGradient adapts SwiftUI's mesh gradient idea into a layered radial
 * gradient surface that works in standard CSS.
 *
 * @see https://developer.apple.com/documentation/swiftui/meshgradient
 */
export const MeshGradient = memo(function MeshGradient(props: IMeshGradientProps) {
  const { colors, height, points, width, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('mesh-gradient'),
    style: {
      width: `${width}px`,
      height: `${height}px`,
      backgroundImage: buildGradient(colors, points),
      backgroundColor: colors.at(-1),
      ...restProps.style,
    },
  })

  return <div {...commonProps} {...finalRestProps} />
})

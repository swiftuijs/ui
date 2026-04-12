import { memo } from 'react'
import type { CSSProperties } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

export interface IUnevenRoundedRectangleCornerRadii {
  bottomLeading?: number
  bottomTrailing?: number
  topLeading?: number
  topTrailing?: number
}

export interface IUnevenRoundedRectangleProps extends IBaseComponent {
  cornerRadii?: IUnevenRoundedRectangleCornerRadii
  fill?: string
  stroke?: string
  strokeWidth?: number
}

/**
 * UnevenRoundedRectangle mirrors SwiftUI's shape by allowing each corner radius
 * to vary independently.
 *
 * @see https://developer.apple.com/documentation/swiftui/unevenroundedrectangle
 */
export const UnevenRoundedRectangle = memo(function UnevenRoundedRectangle(props: IUnevenRoundedRectangleProps) {
  const {
    cornerRadii,
    fill,
    stroke,
    strokeWidth = 0,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('shape'), prefixClass('shape-uneven-rounded-rectangle')],
    style: {
      '--sw-shape-top-leading-radius': `${cornerRadii?.topLeading ?? 0}px`,
      '--sw-shape-top-trailing-radius': `${cornerRadii?.topTrailing ?? 0}px`,
      '--sw-shape-bottom-leading-radius': `${cornerRadii?.bottomLeading ?? 0}px`,
      '--sw-shape-bottom-trailing-radius': `${cornerRadii?.bottomTrailing ?? 0}px`,
      backgroundColor: fill,
      borderColor: stroke,
      borderWidth: strokeWidth > 0 ? `${strokeWidth}px` : undefined,
      borderStyle: strokeWidth > 0 ? 'solid' : undefined,
      ...restProps.style,
    } as CSSProperties,
  })

  return <div {...commonProps} {...finalRestProps} />
})

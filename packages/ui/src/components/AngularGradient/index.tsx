import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import { formatStops, resolvePosition, type IGradientStop, type IUnitPoint } from '../Gradient/shared'

export interface IAngularGradientProps extends IBaseComponent {
  center?: IUnitPoint
  startAngle?: number
  endAngle?: number
  stops: IGradientStop[]
}

export const AngularGradient = memo(function AngularGradient(props: IAngularGradientProps) {
  const {
    center = 'center',
    endAngle = 360,
    startAngle = 0,
    stops,
    ...restProps
  } = props
  void endAngle

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('angular-gradient'),
    style: {
      backgroundImage: `conic-gradient(from ${startAngle}deg at ${resolvePosition(center)}, ${formatStops(stops)})`,
      ...restProps.style,
    },
  })

  return <div {...commonProps} {...finalRestProps} />
})

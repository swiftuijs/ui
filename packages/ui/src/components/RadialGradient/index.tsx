import { memo } from 'react'

import { prefixClass, standardizeProps, standardizeUnit } from '@/common'
import type { IBaseComponent } from '@/types'

import { formatStops, resolvePosition, type IGradientStop, type IUnitPoint } from '../Gradient/shared'

export interface IRadialGradientProps extends IBaseComponent {
  center?: IUnitPoint
  startRadius?: number | string
  endRadius: number | string
  stops: IGradientStop[]
}

export const RadialGradient = memo(function RadialGradient(props: IRadialGradientProps) {
  const {
    center = 'center',
    endRadius,
    startRadius = 0,
    stops,
    ...restProps
  } = props
  void startRadius

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('radial-gradient'),
    style: {
      backgroundImage: `radial-gradient(circle ${standardizeUnit(endRadius)} at ${resolvePosition(center)}, ${formatStops(stops)})`,
      ...restProps.style,
    },
  })

  return <div {...commonProps} {...finalRestProps} />
})

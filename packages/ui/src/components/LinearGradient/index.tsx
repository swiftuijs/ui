import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import { formatStops, resolveLinearDirection, type IGradientStop, type IUnitPoint } from '../Gradient/shared'

export interface ILinearGradientProps extends IBaseComponent {
  startPoint?: IUnitPoint
  endPoint?: IUnitPoint
  stops: IGradientStop[]
}

export const LinearGradient = memo(function LinearGradient(props: ILinearGradientProps) {
  const {
    endPoint = 'bottom',
    startPoint = 'top',
    stops,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('linear-gradient'),
    style: {
      backgroundImage: `linear-gradient(${resolveLinearDirection(startPoint, endPoint)}, ${formatStops(stops)})`,
      ...restProps.style,
    },
  })

  return <div {...commonProps} {...finalRestProps} />
})

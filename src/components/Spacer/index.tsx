import type { IBaseComponent } from 'src/types'
import { mergeStyle, standardizeUnit } from 'src/common'

import './style.scss'

export interface ISpacerProps extends Omit<IBaseComponent, 'children'>{
  minLength?: number | string
}

export function Spacer (props: ISpacerProps) {
  const { minLength, ...styleProps } = props

  const combinedStyle = mergeStyle(styleProps, {
    style: {
      '--min-length': standardizeUnit(minLength || 0),
    },
    className: 'sw-spacer'
  })
  
  return (
    <div {...combinedStyle}></div>
  )
}
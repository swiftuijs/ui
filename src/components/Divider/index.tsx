import type { IBaseComponent } from 'src/types'
import { mergeStyle, standardizeUnit } from 'src/common'

import './style.scss'

export interface IDividerProps extends Omit<IBaseComponent, 'children'>{
  minLength?: number | string
}

export function Divider (props: IDividerProps) {
  const { minLength, ...styleProps } = props

  const combinedStyle = mergeStyle(styleProps, {
    style: {
      '--min-length': standardizeUnit(minLength || 0),
    },
    className: 'sw-divider'
  })
  
  return (
    <div {...combinedStyle}></div>
  )
}
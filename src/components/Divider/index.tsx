import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'

export interface IDividerProps extends Omit<IBaseComponent, 'children'>{}

export function Divider (props: IDividerProps) {
  const { ...styleProps } = props

  const combinedStyle = mergeStyle(styleProps, {
    className: 'sw-divider'
  })
  
  return <div {...combinedStyle} />
}
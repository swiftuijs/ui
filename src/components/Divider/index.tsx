import type { IBaseComponent } from 'src/types'
import { useContext } from 'react'
import { mergeStyle, StyleContext } from 'src/common'

import './style.scss'

export interface IDividerProps extends Omit<IBaseComponent, 'children'>{}

export function Divider (props: IDividerProps) {
  const styleContext = useContext(StyleContext)

  const { ...styleProps } = props

  const combinedStyle = mergeStyle(styleProps, {
    className: `sw-divider ${styleContext.boxDirection}`
  })
  
  return <div {...combinedStyle} />
}
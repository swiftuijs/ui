import type { IBaseComponent } from 'src/types'
import { useContext } from 'react'
import { mergeStyle } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

export interface IDividerProps extends Omit<IBaseComponent, 'children'>{}

export function Divider (props: IDividerProps) {
  const layoutContext = useContext(LayoutContext)

  const { ...styleProps } = props

  const combinedStyle = mergeStyle(styleProps, {
    className: `sw-divider ${layoutContext.boxDirection}`
  })
  
  return <div {...combinedStyle} />
}
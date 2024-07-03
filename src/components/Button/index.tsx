import type { IBaseElementComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'

export interface IButtonProps extends IBaseElementComponent<'button'> {
  
}

export function Button (props: IButtonProps) {
  const { style, className, children, ...restProps } = props

  const combinedStyle = mergeStyle({ style, className }, {
    className: 'sw-button'
  })
  
  return (
    <button {...combinedStyle} {...restProps}>{children}</button>
  )
}

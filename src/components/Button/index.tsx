import type { IBaseElementComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export interface IButtonProps extends IBaseElementComponent<'button'> {
  
}

export function Button (props: IButtonProps) {
  const { commonProps, restProps, children } = standardizeProps(props, {
    className: 'sw-button'
  })
  
  return (
    <button {...commonProps} {...restProps}>{children}</button>
  )
}

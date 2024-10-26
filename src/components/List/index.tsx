import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export interface IListProps extends IBaseComponent {
  // your custom props here
}

export function List (props: IListProps) {
  const { ...cProps } = props

  const {commonProps, restProps, children} = standardizeProps(cProps, {
    className: 'sw-list'
  })
  
  return (
    <div {...commonProps} {...restProps}>{children}</div>
  )
}
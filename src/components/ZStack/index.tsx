import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export function ZStack(props: IBaseComponent) {
  const { children, commonProps, restProps } = standardizeProps(props, {
    className: 'sw-zstack'
  })
  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}
import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export function Text(props: IBaseComponent) {
  const {commonProps, restProps, children} = standardizeProps(props, {
    className: 'sw-text'
  })

  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}
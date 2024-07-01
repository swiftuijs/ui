import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'

export function ZStack(props: IBaseComponent) {
  const { children, ...styleProps } = props
  const mergedStyle = mergeStyle(styleProps, {
    className: 'sw-zstack'
  })
  return (
    <div {...mergedStyle}>
      {children}
    </div>
  )
}
import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'


export function VStack(props: IBaseComponent) {
  const { children, ...styleProps } = props
  const mergedStyle = mergeStyle(styleProps, {
    className: 'sw-vstack'
  })
  return (
    <div {...mergedStyle}>
      {children}
    </div>
  )
}
import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'

export function Text(props: IBaseComponent) {
  const { children, ...styleProps } = props

  const combinedStyle = mergeStyle(styleProps, {
    className: 'sw-text'
  })

  return (
    <div {...combinedStyle}>
      {children}
    </div>
  )
}
import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'

export function Page(props: IBaseComponent) {
  const { children, ...styleProps } = props
  const mergedStyle = mergeStyle(styleProps, {
    className: 'sw-page'
  })
  return (
    <div {...mergedStyle}>
      {children}
    </div>
  )
}

import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'

export interface IScrollViewProps extends IBaseComponent {
  direction?: 'horizontal' | 'vertical'
}

export function ScrollView (props: IScrollViewProps) {
  const { children, direction, ...styleProps } = props

  const mergedStyle = mergeStyle(styleProps, {
    className: ['sw-scrollview', direction || 'vertical']
  })

  
  return (
    <div {...mergedStyle}>
      {children}
    </div>
  )
}
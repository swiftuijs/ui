import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

export interface IScrollViewProps extends IBaseComponent {
  direction?: 'horizontal' | 'vertical'
}

export function ScrollView (props: IScrollViewProps) {
  const { direction, ...sProps } = props

  const {commonProps, restProps, children} = standardizeProps(sProps, {
    className: [prefixClass('scrollview'), direction || 'vertical']
  })

  
  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}
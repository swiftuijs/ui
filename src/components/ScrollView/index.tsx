import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

export interface IScrollViewProps extends IBaseComponent {
  /**
   * The direction of the scroll view, default to vertical.
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * Whether to show the scroll bar, default to true.
   */
  showsIndicators?: boolean
}

export function ScrollView (props: IScrollViewProps) {
  const { direction, showsIndicators = true, ...sProps } = props
  const {commonProps, restProps, children} = standardizeProps(sProps, {
    className: [
      prefixClass('scrollview'),
      direction || 'vertical',
      showsIndicators ? '' : 'no-scroll-bar'
    ]
  })

  
  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}
import type { IBaseComponent, EAlignment } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

export interface IZStackProps extends IBaseComponent {
  alignment?: EAlignment
}

export function ZStack(props: IZStackProps) {
  console.log('ZStack', props.alignment)
  const { children, commonProps, restProps } = standardizeProps(props, {
    className: [prefixClass('zstack'), prefixClass('container')]
  })
  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}
import type { IBaseElementComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export interface IImageProps extends Omit<IBaseElementComponent<'img'>, 'children'> {
  // your custom props here
}

export function Image (props: IImageProps) {

  const { commonProps, restProps } = standardizeProps(props, {
    className: 'sw-image'
  })
  
  return (
    <img {...commonProps} {...restProps} />
  )
}
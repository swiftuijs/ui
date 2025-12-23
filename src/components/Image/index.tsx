import type { IBaseElementComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export type IImageProps = Omit<IBaseElementComponent<'img'>, 'children'>

export function Image (props: IImageProps) {

  const { commonProps, restProps } = standardizeProps(props, {
    className: 'sw-image'
  })
  
  return (
    <img {...commonProps} {...restProps} />
  )
}
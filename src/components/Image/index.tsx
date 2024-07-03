import type { IBaseElementComponent } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'

export interface IImageProps extends Omit<IBaseElementComponent<'img'>, 'children'> {
  // your custom props here
}

export function Image (props: IImageProps) {
  const { ...styleProps } = props

  const combinedStyle = mergeStyle(styleProps, {
    className: 'sw-image'
  })
  
  return (
    <img {...combinedStyle} />
  )
}
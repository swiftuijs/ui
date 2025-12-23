import { memo } from 'react'
import type { IBaseElementComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A view that displays an image.
 * 
 * Use Image to display images from various sources, including bundled images,
 * system images, and images from URLs.
 * 
 * @example
 * ```tsx
 * <Image src="photo.jpg" alt="A photo" />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/image
 */
export type IImageProps = Omit<IBaseElementComponent<'img'>, 'children'>

export const Image = memo(function Image (props: IImageProps) {
  const { commonProps, restProps } = standardizeProps(props, {
    className: prefixClass('image')
  })
  
  return (
    <img {...commonProps} {...restProps} />
  )
})
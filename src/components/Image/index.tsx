import { memo, useRef, useEffect } from 'react'
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
export type IImageProps = Omit<IBaseElementComponent<'img'>, 'children'> & {
  /**
   * View transition name for shared element transitions
   */
  viewTransitionName?: string
}

export const Image = memo(function Image (props: IImageProps) {
  const { viewTransitionName, ...imgProps } = props
  const imgRef = useRef<HTMLImageElement>(null)
  
  const { commonProps, restProps } = standardizeProps(imgProps, {
    className: prefixClass('image')
  })
  
  // Set view-transition-name using ref to avoid React warning
  useEffect(() => {
    if (imgRef.current && viewTransitionName) {
      imgRef.current.style.setProperty('view-transition-name', viewTransitionName)
    }
  }, [viewTransitionName])
  
  return (
    <img ref={imgRef} {...commonProps} {...restProps} />
  )
})
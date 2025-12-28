import { memo, useMemo } from 'react'
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
  
  const { commonProps, restProps } = standardizeProps(imgProps, {
    className: prefixClass('image')
  })
  
  // Use ref callback to set view-transition-name immediately when element is created
  const imgRef = useMemo(() => {
    return (node: HTMLImageElement | null) => {
      if (node && viewTransitionName) {
        node.style.setProperty('view-transition-name', viewTransitionName)
        console.log('[Image] Set view-transition-name immediately:', viewTransitionName, node)
      }
    }
  }, [viewTransitionName])
  
  return (
    <img ref={imgRef} {...commonProps} {...restProps} />
  )
})
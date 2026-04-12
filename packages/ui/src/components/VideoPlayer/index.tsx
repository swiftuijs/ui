import { memo } from 'react'

import type { IBaseElementComponent } from '@/types'
import { clsx, prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * VideoPlayer wraps the native video element with SwiftUI-style semantics
 * while preserving built-in browser playback controls.
 *
 * @see https://developer.apple.com/documentation/avkit/videoplayer
 */
export interface IVideoPlayerProps extends IBaseElementComponent<'video'> {
  /**
   * Video source URL.
   */
  src: string
}

export const VideoPlayer = memo(function VideoPlayer(props: IVideoPlayerProps) {
  const { src, ...restProps } = props
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('videoplayer'),
  })

  return (
    <video
      {...commonProps}
      {...finalRestProps}
      className={clsx(prefixClass('videoplayer'), commonProps.className)}
      controls
      src={src}
    >
      {children}
    </video>
  )
})

import { memo, useEffect, useRef, useState, type ComponentRef, type SyntheticEvent } from 'react'

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
  /**
   * Emits the current media playback state.
   */
  onPlaybackStateChange?: (state: 'loading' | 'ready' | 'playing' | 'paused' | 'error') => void
}

export const VideoPlayer = memo(function VideoPlayer(props: IVideoPlayerProps) {
  const { src, onPlaybackStateChange, onLoadStart, onLoadedData, onPlay, onPause, onError, ...restProps } = props
  const hasSource = Boolean(src)
  const [state, setState] = useState<'loading' | 'ready' | 'playing' | 'paused' | 'error'>(() =>
    hasSource ? 'loading' : 'error',
  )
  const previousStateRef = useRef<typeof state | undefined>(undefined)
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('videoplayer'),
  })

  useEffect(() => {
    setState(hasSource ? 'loading' : 'error')
  }, [hasSource, src])

  useEffect(() => {
    if (previousStateRef.current === state) {
      return
    }

    previousStateRef.current = state
    onPlaybackStateChange?.(state)
  }, [onPlaybackStateChange, state])

  type VideoElement = ComponentRef<'video'>

  return (
    <video
      {...commonProps}
      {...finalRestProps}
      className={clsx(prefixClass('videoplayer'), commonProps.className)}
      controls
      data-state={state}
      onError={(event: SyntheticEvent<VideoElement>) => {
        setState('error')
        onError?.(event)
      }}
      onLoadedData={(event: SyntheticEvent<VideoElement>) => {
        setState('ready')
        onLoadedData?.(event)
      }}
      onLoadStart={(event: SyntheticEvent<VideoElement>) => {
        setState(hasSource ? 'loading' : 'error')
        onLoadStart?.(event)
      }}
      onPause={(event: SyntheticEvent<VideoElement>) => {
        setState('paused')
        onPause?.(event)
      }}
      onPlay={(event: SyntheticEvent<VideoElement>) => {
        setState('playing')
        onPlay?.(event)
      }}
      src={src || undefined}
    >
      {children}
    </video>
  )
})

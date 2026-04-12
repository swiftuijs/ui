import { memo } from 'react'

import type { IBaseComponent } from '@/types'
import {
  PhaseAnimator,
  type IPhaseAnimatorControls,
} from '../PhaseAnimator'

export interface IKeyframeAnimatorProps<TFrame> extends Omit<IBaseComponent, 'children'> {
  /**
   * Render function for the current keyframe.
   */
  children: (frame: TFrame, controls: IPhaseAnimatorControls<TFrame>) => React.ReactNode
  /**
   * Milliseconds between keyframes.
   *
   * @default 1000
   */
  interval?: number
  /**
   * Ordered keyframe values to step through.
   */
  keyframes: TFrame[]
  /**
   * Whether to repeat from the first keyframe after the last.
   *
   * @default true
   */
  repeat?: boolean
}

/**
 * KeyframeAnimator adapts SwiftUI's keyframe animation mental model to the web
 * by sequencing explicit frame values over a fixed interval.
 *
 * @see https://developer.apple.com/documentation/swiftui/keyframeanimator
 */
export const KeyframeAnimator = memo(function KeyframeAnimator<TFrame>(props: IKeyframeAnimatorProps<TFrame>) {
  const {
    children,
    interval = 1000,
    keyframes,
    repeat = true,
  } = props

  return (
    <PhaseAnimator
      interval={interval}
      phases={keyframes}
      repeat={repeat}
    >
      {(frame, controls) => children(frame, controls)}
    </PhaseAnimator>
  )
}) as <TFrame>(props: IKeyframeAnimatorProps<TFrame>) => React.ReactElement

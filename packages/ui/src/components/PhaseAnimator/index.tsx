import { memo, useEffect, useMemo, useState } from 'react'

import type { IBaseComponent } from '@/types'

export type PhaseAnimatorTrigger = 'automatic' | 'onDemand'

export interface IPhaseAnimatorControls<TPhase> {
  advance: () => void
  phase: TPhase
  reset: () => void
  setPhaseIndex: (index: number) => void
}

export interface IPhaseAnimatorProps<TPhase> extends Omit<IBaseComponent, 'children'> {
  /**
   * Render function for the current phase.
   */
  children: (phase: TPhase, controls: IPhaseAnimatorControls<TPhase>) => React.ReactNode
  /**
   * Milliseconds between automatic phase changes.
   *
   * @default 1000
   */
  interval?: number
  /**
   * Ordered phases to cycle through.
   */
  phases: TPhase[]
  /**
   * Whether to wrap back to the first phase.
   *
   * @default true
   */
  repeat?: boolean
  /**
   * Animation trigger style.
   *
   * @default 'automatic'
   */
  trigger?: PhaseAnimatorTrigger
}

/**
 * PhaseAnimator adapts SwiftUI's phase-based animation model to React using a
 * render-prop container with automatic or on-demand phase progression.
 *
 * @see https://developer.apple.com/documentation/swiftui/phaseanimator
 */
export const PhaseAnimator = memo(function PhaseAnimator<TPhase>(props: IPhaseAnimatorProps<TPhase>) {
  const {
    children,
    phases,
    interval = 1000,
    repeat = true,
    trigger = 'automatic',
  } = props
  const [phaseIndex, setPhaseIndex] = useState(0)
  const safePhases = useMemo(() => (phases.length > 0 ? phases : [null] as TPhase[]), [phases])
  const lastIndex = safePhases.length - 1

  const advance = () => {
    setPhaseIndex((current) => {
      if (current >= lastIndex) {
        return repeat ? 0 : current
      }

      return current + 1
    })
  }

  const reset = () => {
    setPhaseIndex(0)
  }

  useEffect(() => {
    if (trigger !== 'automatic' || safePhases.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setPhaseIndex((current) => {
        if (current >= lastIndex) {
          return repeat ? 0 : current
        }

        return current + 1
      })
    }, interval)

    return () => {
      window.clearInterval(timer)
    }
  }, [interval, lastIndex, repeat, safePhases.length, trigger])

  const clampedIndex = Math.min(phaseIndex, lastIndex)
  const phase = safePhases[clampedIndex]

  return (
    <>
      {children(phase, {
        advance,
        phase,
        reset,
        setPhaseIndex: (index) => setPhaseIndex(Math.max(0, Math.min(index, lastIndex))),
      })}
    </>
  )
}) as <TPhase>(props: IPhaseAnimatorProps<TPhase>) => React.ReactElement

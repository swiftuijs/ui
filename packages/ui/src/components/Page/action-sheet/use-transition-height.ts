import { useEffect, useCallback, useRef, type RefObject } from 'react'
import type { IPresentationDetent } from '@/types'
import { eventBus } from '@/common'
import { useDetents } from './use-detents'
import { prefersReducedMotion } from '@/common/motion'

export interface IDragBarProps {
  eventToChangeDetent: string
  presentationDetents: IPresentationDetent[]
  container: RefObject<HTMLDivElement | null>
}

/**
 * transition action sheet height when change with transition animation
 */
export function useTransitionHeight(props: IDragBarProps) {
  const detentInfo = useDetents(props.presentationDetents)
  const detentIndex = useRef(detentInfo.sizes.indexOf(detentInfo.default))
  const finishTransition = useRef<() => void>(() => {})
  useEffect(() => () => finishTransition.current(), [])
  // update height with transition animation
  const updateHeight = useCallback((height: number) => {
    if (!props.container?.current) return
    const container = props.container.current!
    finishTransition.current()
    const finish = () => {
      container.classList.remove('animate-height')
      container.removeEventListener('transitionend', onTransitionEnd)
      clearTimeout(timer)
    }
    const onTransitionEnd = (event: globalThis.TransitionEvent) => {
      if (event.target === container && event.propertyName === 'height') finish()
    }
    let timer: ReturnType<typeof setTimeout>
    finishTransition.current = finish
    container.addEventListener('transitionend', onTransitionEnd)
    container.classList.add('animate-height')
    const nearestHeight = getNearestHeight(height, detentInfo.sizes)
    detentIndex.current = detentInfo.sizes.indexOf(nearestHeight!)
    container.style.height = `${nearestHeight}px`
    const duration = getComputedStyle(container).transitionDuration
    const milliseconds = parseFloat(duration) * (duration.endsWith('ms') ? 1 : 1000) || 0
    timer = setTimeout(finish, prefersReducedMotion() ? 0 : milliseconds + (milliseconds ? 50 : 0))
  }, [props.container, detentInfo])

  // update height when detentIndex changed(resized)
  useEffect(() => {
    if (!props.container?.current) return
    const container = props.container.current!
    const height = detentInfo.sizes[Math.min(detentIndex.current, detentInfo.sizes.length - 1)]
    if (`${height}px` === container.style.height) return
    updateHeight(height)
  }, [props.container, detentInfo, updateHeight])

  // listen to event to change height
  useEffect(() => {
    eventBus.on(props.eventToChangeDetent, updateHeight)
    return () => {
      eventBus.off(props.eventToChangeDetent, updateHeight)
    }
  }, [props.eventToChangeDetent, updateHeight])
}

function getNearestHeight(height: number, detents: number[]) {
  for (let i = 0; i < detents.length; i++) {
    const detent = detents[i]
    if (detent > height) {
      if (i === 0) return detent
    }
    // at last detent
    if (i === detents.length - 1) return detent
    const nextDetent = detents[i + 1]
    if (height > nextDetent) {
      continue
    }
    // get the nearest detent
    return height - detent < nextDetent - height ? detent : nextDetent
  }
}

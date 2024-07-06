import { useEffect, useCallback, useRef, type RefObject } from 'react'
import type { IPresentationDetent } from 'src/types'
import { eventBus } from 'src/common'
import { useDetents } from './use-detents'

export interface IDragBarProps {
  eventToChangeDetent: string
  presentationDetents: IPresentationDetent[]
  container: RefObject<HTMLDivElement | undefined>
}

/**
 * transition action sheet height when change with transition animation
 */
export function useTransitionHeight(props: IDragBarProps) {
  const detentInfo = useDetents(props.presentationDetents)
  const detentIndex = useRef(detentInfo.sizes.indexOf(detentInfo.default))
  // update height with transition animation
  const updateHeight = useCallback((height: number) => {
    if (!props.container?.current) return
    const container = props.container.current!
    const onTransitionEnd = () => {
      container.classList.remove('animate-height')
      container.removeEventListener('transitionend', onTransitionEnd)
    }
    container.addEventListener('transitionend', onTransitionEnd)
    container.classList.add('animate-height')
    const nearestHeight = getNearestHeight(height, detentInfo.sizes)
    container.style.height = `${nearestHeight}px`
  }, [props.container, detentInfo])

  // update height when detentIndex changed(resized)
  useEffect(() => {
    if (!props.container?.current) return
    const container = props.container.current!
    const height = detentInfo.sizes[detentIndex.current]
    if (`${height}px` === container.style.height) return
    updateHeight(height)
  }, [props.container, detentInfo, updateHeight])

  // listen to event to change height
  useEffect(() => {
    eventBus.on(props.eventToChangeDetent, (height: number) => {
      console.log("height", height)
      updateHeight(height)
    })
    return () => {
      eventBus.off(props.eventToChangeDetent)
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

import { memo, useEffect, useState } from 'react'

import type { ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { clsx, prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * TimelineView re-renders its content on a fixed cadence.
 *
 * @see https://developer.apple.com/documentation/swiftui/timelineview
 */
export interface ITimelineViewProps extends Omit<IBaseComponent, 'children'> {
  interval: number
  children: (date: Date) => ReactNode
}

export const TimelineView = memo(function TimelineView(props: ITimelineViewProps) {
  const { children, interval, ...restProps } = props
  const [date, setDate] = useState(() => new Date())
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('timelineview'),
  })

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDate(new Date())
    }, interval)

    return () => {
      window.clearInterval(timer)
    }
  }, [interval])

  return (
    <div {...commonProps} {...finalRestProps} className={clsx(prefixClass('timelineview'), commonProps.className)}>
      {children(date)}
    </div>
  )
})

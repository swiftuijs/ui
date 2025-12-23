import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A view that shows the progress toward completion of a task.
 * 
 * Use ProgressView to display a progress bar that indicates how much of a task has been completed.
 * 
 * @example
 * ```tsx
 * <ProgressView progress={0.5} />
 * <ProgressView progress={0.75} total={100} completed={75} />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/progressview
 */
export interface IProgressViewProps extends IBaseComponent {
  /**
   * The progress value as a number between 0 and 1.
   * If total and completed are provided, this will be calculated automatically.
   */
  progress?: number
  /**
   * The total value for calculating progress.
   * Used together with completed to calculate progress percentage.
   */
  total?: number
  /**
   * The completed value for calculating progress.
   * Used together with total to calculate progress percentage.
   */
  completed?: number
  /**
   * Whether to show an indeterminate progress indicator.
   * 
   * @default false
   */
  indeterminate?: boolean
}

export const ProgressView = memo(function ProgressView(props: IProgressViewProps) {
  const {
    progress: progressProp,
    total,
    completed,
    indeterminate = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('progressview')
  })

  let progress = progressProp
  if (progress === undefined && total !== undefined && completed !== undefined) {
    progress = Math.min(Math.max(completed / total, 0), 1)
  }
  if (progress === undefined) {
    progress = 0
  }

  const percentage = Math.min(Math.max(progress * 100, 0), 100)

  return (
    <div {...commonProps} {...finalRestProps}>
      {indeterminate ? (
        <div className={prefixClass('progressview-indeterminate')}>
          <div className={prefixClass('progressview-indeterminate-bar')} />
        </div>
      ) : (
        <div className={prefixClass('progressview-track')}>
          <div
            className={prefixClass('progressview-fill')}
            style={{ width: `${percentage}%` }}
          />
        </div>
      )}
    </div>
  )
})


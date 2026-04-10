import { memo } from 'react'
import type { ReactNode } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A view that shows the progress toward completion of a task.
 *
 * Use ProgressView to display determinate or indeterminate task progress.
 * The web implementation preserves `progressbar` accessibility semantics while
 * aligning with SwiftUI's `value` and `total` mental model.
 *
 * @example
 * ```tsx
 * <ProgressView value={0.5} />
 * <ProgressView value={30} total={100} />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/progressview
 */
export interface IProgressViewProps extends Omit<IBaseElementComponent<'div'>, 'children'> {
  /**
   * The current progress value.
   *
   * When `total` is omitted, `value` is treated as a fractional value between 0 and 1.
   */
  value?: number
  /**
   * The total value for calculating progress.
   */
  total?: number
  /**
   * Legacy fractional progress alias retained for existing callers.
   */
  progress?: number
  /**
   * Legacy current value alias retained for existing callers.
   */
  completed?: number
  /**
   * Whether to show an indeterminate progress indicator.
   *
   * @default false
   */
  indeterminate?: boolean
  /**
   * Optional leading label rendered alongside the progress indicator.
   */
  label?: ReactNode
  /**
   * Optional trailing value label rendered alongside the progress indicator.
   */
  currentValueLabel?: ReactNode
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export const ProgressView = memo(function ProgressView(props: IProgressViewProps) {
  const {
    value,
    total,
    progress,
    completed,
    indeterminate = false,
    label,
    currentValueLabel,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('progressview'),
  })

  const {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledby,
    ...containerProps
  } = finalRestProps

  let currentValue = value
  let maximumValue = total

  if (currentValue === undefined && completed !== undefined) {
    currentValue = completed
  }

  if (currentValue === undefined && progress !== undefined) {
    currentValue = clamp(progress, 0, 1)
    maximumValue = 1
  }

  if (currentValue === undefined) {
    currentValue = 0
  }

  if (maximumValue === undefined) {
    maximumValue = 1
  }

  const safeMaximum = maximumValue > 0 ? maximumValue : 1
  const clampedValue = clamp(currentValue, 0, safeMaximum)
  const progressRatio = indeterminate ? undefined : clamp(clampedValue / safeMaximum, 0, 1)
  const percentage = progressRatio === undefined ? undefined : Math.round(progressRatio * 100)
  const ariaValueText = currentValueLabel !== undefined
    ? String(currentValueLabel)
    : percentage !== undefined
      ? `${percentage}%`
      : undefined

  return (
    <div {...commonProps} {...containerProps}>
      {(label !== undefined || currentValueLabel !== undefined) && (
        <div className={prefixClass('progressview-labels')}>
          {label !== undefined && (
            <span className={prefixClass('progressview-label')}>
              {label}
            </span>
          )}
          {currentValueLabel !== undefined && (
            <span className={prefixClass('progressview-current-value')}>
              {currentValueLabel}
            </span>
          )}
        </div>
      )}
      <div
        className={prefixClass(indeterminate ? 'progressview-indeterminate' : 'progressview-track')}
        role="progressbar"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledby}
        aria-valuemin={0}
        aria-valuemax={indeterminate ? undefined : safeMaximum}
        aria-valuenow={indeterminate ? undefined : clampedValue}
        aria-valuetext={ariaValueText}
      >
        {indeterminate ? (
          <div
            className={prefixClass('progressview-indeterminate-bar')}
          />
        ) : (
          <div
            className={prefixClass('progressview-fill')}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  )
})

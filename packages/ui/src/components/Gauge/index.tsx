import { memo, type ReactNode } from 'react'

import type { IBaseElementComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A view that shows a current value in relation to a bounded range.
 *
 * @see https://developer.apple.com/documentation/swiftui/gauge
 */
export interface IGaugeProps extends Omit<IBaseElementComponent<'div'>, 'children'> {
  /**
   * The primary label for the gauge.
   */
  label?: ReactNode
  /**
   * The current gauge value.
   */
  value: number
  /**
   * The lower bound of the gauge range.
   *
   * @default 0
   */
  min?: number
  /**
   * The upper bound of the gauge range.
   *
   * @default 1
   */
  max?: number
  /**
   * Optional label describing the current value.
   */
  currentValueLabel?: ReactNode
  /**
   * Optional label for the minimum edge of the range.
   */
  minimumValueLabel?: ReactNode
  /**
   * Optional label for the maximum edge of the range.
   */
  maximumValueLabel?: ReactNode
}

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max)
}

export const Gauge = memo(function Gauge(props: IGaugeProps) {
  const {
    label,
    value,
    min = 0,
    max = 1,
    currentValueLabel,
    minimumValueLabel,
    maximumValueLabel,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('gauge'),
  })

  const safeMax = max > min ? max : min + 1
  const clampedValue = clamp(value, min, safeMax)
  const progressRatio = clamp((clampedValue - min) / (safeMax - min), 0, 1)
  const {
    ['aria-label']: ariaLabel,
    ['aria-labelledby']: ariaLabelledBy,
    ...containerProps
  } = finalRestProps

  return (
    <div {...commonProps} {...containerProps}>
      {(label !== undefined || currentValueLabel !== undefined) ? (
        <div className={prefixClass('gauge-header')}>
          {label !== undefined ? <span className={prefixClass('gauge-label')}>{label}</span> : null}
          {currentValueLabel !== undefined ? (
            <span className={prefixClass('gauge-current-value')}>{currentValueLabel}</span>
          ) : null}
        </div>
      ) : null}
      <div
        className={prefixClass('gauge-track')}
        role="progressbar"
        aria-label={ariaLabel ?? (typeof label === 'string' ? label : undefined)}
        aria-labelledby={ariaLabelledBy}
        aria-valuemin={min}
        aria-valuemax={safeMax}
        aria-valuenow={clampedValue}
      >
        <div className={prefixClass('gauge-fill')} style={{ width: `${progressRatio * 100}%` }} />
      </div>
      {(minimumValueLabel !== undefined || maximumValueLabel !== undefined) ? (
        <div className={prefixClass('gauge-bounds')}>
          <span className={prefixClass('gauge-bound')}>{minimumValueLabel}</span>
          <span className={prefixClass('gauge-bound')}>{maximumValueLabel}</span>
        </div>
      ) : null}
    </div>
  )
})

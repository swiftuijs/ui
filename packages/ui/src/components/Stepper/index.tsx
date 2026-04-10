import { memo, useState } from 'react'
import type { IBaseComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A control used to perform semantic increment and decrement actions.
 *
 * Use Stepper to create a control that allows users to increment or decrement a value.
 *
 * @example
 * ```tsx
 * <Stepper
 *   value={count}
 *   onValueChange={setCount}
 *   min={0}
 *   max={10}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/stepper
 */
export interface IStepperProps extends IBaseComponent {
  /**
   * The current value when used in controlled mode.
   */
  value?: number
  /**
   * The initial value when used in uncontrolled mode.
   *
   * @default 0
   */
  defaultValue?: number
  /**
   * Native-style change callback with the next numeric value.
   */
  onChange?: (value: number) => void
  /**
   * SwiftUI-style value callback.
   */
  onValueChange?: (value: number) => void
  /**
   * The minimum value allowed.
   */
  min?: number
  /**
   * The maximum value allowed.
   */
  max?: number
  /**
   * The step amount for each increment/decrement.
   *
   * @default 1
   */
  step?: number
  /**
   * Whether the stepper is disabled.
   *
   * @default false
   */
  disabled?: boolean
}

function clampValue(value: number, min?: number, max?: number) {
  let nextValue = value

  if (min !== undefined) {
    nextValue = Math.max(min, nextValue)
  }

  if (max !== undefined) {
    nextValue = Math.min(max, nextValue)
  }

  return nextValue
}

export const Stepper = memo(function Stepper(props: IStepperProps) {
  const {
    value: controlledValue,
    defaultValue,
    onChange,
    onValueChange,
    min,
    max,
    step = 1,
    disabled = false,
    ...restProps
  } = props

  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = useState(() => clampValue(defaultValue ?? controlledValue ?? 0, min, max))
  const currentValue = isControlled ? controlledValue : internalValue
  const value = clampValue(currentValue, min, max)

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('stepper'), disabled && prefixClass('stepper-disabled')]
  })

  const emitChange = (nextValue: number) => {
    onChange?.(nextValue)
    onValueChange?.(nextValue)
  }

  const updateValue = (delta: number) => {
    if (disabled) {
      return
    }

    const nextValue = clampValue(value + delta, min, max)

    if (nextValue === value) {
      return
    }

    if (!isControlled) {
      setInternalValue(nextValue)
    }

    emitChange(nextValue)
  }

  const canIncrement = !disabled && (max === undefined || value + step <= max)
  const canDecrement = !disabled && (min === undefined || value - step >= min)

  return (
    <div {...commonProps} {...finalRestProps} role="group">
      <button
        type="button"
        className={prefixClass('stepper-button')}
        onClick={() => updateValue(-step)}
        disabled={!canDecrement}
        aria-label="Decrement value"
      >
        <span className={prefixClass('stepper-icon')}>−</span>
      </button>
      <span
        className={prefixClass('stepper-value')}
        aria-live="polite"
        aria-atomic="true"
      >
        {value}
      </span>
      <button
        type="button"
        className={prefixClass('stepper-button')}
        onClick={() => updateValue(step)}
        disabled={!canIncrement}
        aria-label="Increment value"
      >
        <span className={prefixClass('stepper-icon')}>+</span>
      </button>
    </div>
  )
})

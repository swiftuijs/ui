import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

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
 *   onIncrement={() => setCount(count + 1)}
 *   onDecrement={() => setCount(count - 1)}
 *   min={0}
 *   max={10}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/stepper
 */
export interface IStepperProps extends IBaseComponent {
  /**
   * The current value.
   */
  value: number
  /**
   * Callback fired when the increment button is pressed.
   */
  onIncrement: () => void
  /**
   * Callback fired when the decrement button is pressed.
   */
  onDecrement: () => void
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

export const Stepper = memo(function Stepper(props: IStepperProps) {
  const {
    value,
    onIncrement,
    onDecrement,
    min,
    max,
    step = 1,
    disabled = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('stepper')
  })

  const canIncrement = max === undefined || value + step <= max
  const canDecrement = min === undefined || value - step >= min

  return (
    <div {...commonProps} {...finalRestProps}>
      <button
        type="button"
        className={prefixClass('stepper-button')}
        onClick={onDecrement}
        disabled={disabled || !canDecrement}
        aria-label="Decrement"
      >
        <span className={prefixClass('stepper-icon')}>−</span>
      </button>
      <span className={prefixClass('stepper-value')}>{value}</span>
      <button
        type="button"
        className={prefixClass('stepper-button')}
        onClick={onIncrement}
        disabled={disabled || !canIncrement}
        aria-label="Increment"
      >
        <span className={prefixClass('stepper-icon')}>+</span>
      </button>
    </div>
  )
})


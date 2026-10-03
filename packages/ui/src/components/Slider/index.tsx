import { memo, forwardRef, useEffect, useImperativeHandle, useRef, useState, type CSSProperties } from 'react'
import type { ChangeEvent } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A control for selecting a value from a bounded linear range of values.
 * 
 * Use Slider to create a draggable control for selecting a value within a range.
 * 
 * @example
 * ```tsx
 * <Slider
 *   value={progress}
 *   onValueChange={setProgress}
 *   min={0}
 *   max={100}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/slider
 */
export interface ISliderProps extends Omit<
  IBaseElementComponent<'input'>,
  'type' | 'value' | 'defaultValue' | 'onChange' | 'children'
> {
  /**
   * The current value of the slider.
   */
  value?: number
  /**
   * The initial value of the slider when uncontrolled.
   */
  defaultValue?: number
  /**
   * Callback fired when the value changes.
   */
  onValueChange?: (value: number) => void
  /**
   * Native change event handler forwarded to the underlying input.
   */
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void
  /**
   * The minimum value of the slider.
   * 
   * @default 0
   */
  min?: number
  /**
   * The maximum value of the slider.
   * 
   * @default 100
   */
  max?: number
  /**
   * The step increment for the slider.
   * 
   * @default 1
   */
  step?: number
  /**
   * Whether the slider is disabled.
   * 
   * @default false
   */
  disabled?: boolean
}

export const Slider = memo(forwardRef<HTMLInputElement, ISliderProps>(function Slider(props, ref) {
  const {
    value,
    defaultValue,
    onValueChange,
    onChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('slider')
  })

  const isControlled = value !== undefined
  const inputRef = useRef<HTMLInputElement>(null)
  useImperativeHandle(ref, () => inputRef.current!, [])
  const initialValue = defaultValue ?? (min + max) / 2
  const [internalValue, setInternalValue] = useState(initialValue)
  useEffect(() => {
    const form = inputRef.current?.form
    const reset = () => setInternalValue(initialValue)
    form?.addEventListener('reset', reset)
    return () => form?.removeEventListener('reset', reset)
  }, [initialValue])
  const currentValue = isControlled ? value : internalValue
  const progress = max <= min ? 0 : Math.max(0, Math.min(100, (currentValue - min) / (max - min) * 100))

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (!isControlled) setInternalValue(event.currentTarget.valueAsNumber)
    onChange?.(event)
    onValueChange?.(event.currentTarget.valueAsNumber)
  }

  return (
    <input
      key={isControlled ? 'controlled' : 'uncontrolled'}
      {...commonProps}
      {...finalRestProps}
      ref={inputRef}
      style={{ ...commonProps.style, '--sw-slider-progress': `${progress}%` } as CSSProperties}
      type="range"
      min={min}
      max={max}
      step={step}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : defaultValue}
      onChange={handleChange}
      disabled={disabled}
    />
  )
}))

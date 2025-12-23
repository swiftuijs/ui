import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

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
export interface ISliderProps extends IBaseComponent {
  /**
   * The current value of the slider.
   */
  value: number
  /**
   * Callback fired when the value changes.
   */
  onValueChange: (value: number) => void
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

export const Slider = memo(function Slider(props: ISliderProps) {
  const {
    value,
    onValueChange,
    min = 0,
    max = 100,
    step = 1,
    disabled = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('slider')
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value)
    onValueChange(newValue)
  }

  const percentage = ((value - min) / (max - min)) * 100

  return (
    <div {...commonProps} {...finalRestProps}>
      <div className={prefixClass('slider-track')}>
        <div
          className={prefixClass('slider-fill')}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={prefixClass('slider-input')}
      />
    </div>
  )
})


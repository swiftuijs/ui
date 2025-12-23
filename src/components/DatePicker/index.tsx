import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A control for selecting dates.
 * 
 * Use DatePicker to create a control that allows users to select a date.
 * 
 * @example
 * ```tsx
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/datepicker
 */
export interface IDatePickerProps extends IBaseComponent {
  /**
   * The currently selected date.
   */
  value?: Date | string
  /**
   * Callback fired when the date changes.
   */
  onValueChange?: (date: Date) => void
  /**
   * The minimum selectable date.
   */
  minimumDate?: Date | string
  /**
   * The maximum selectable date.
   */
  maximumDate?: Date | string
  /**
   * The display mode of the date picker.
   * 
   * @default 'date'
   */
  mode?: 'date' | 'time' | 'datetime'
  /**
   * Whether the date picker is disabled.
   * 
   * @default false
   */
  disabled?: boolean
}

export const DatePicker = memo(function DatePicker(props: IDatePickerProps) {
  const {
    value,
    onValueChange,
    minimumDate,
    maximumDate,
    mode = 'date',
    disabled = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('datepicker')
  })

  const formatDateForInput = (date?: Date | string): string => {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    if (isNaN(d.getTime())) return ''
    
    if (mode === 'date') {
      return d.toISOString().split('T')[0]
    } else if (mode === 'time') {
      return d.toTimeString().slice(0, 5)
    } else {
      return d.toISOString().slice(0, 16)
    }
  }

  const formatMinMaxForInput = (date?: Date | string): string => {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    if (isNaN(d.getTime())) return ''
    
    if (mode === 'date') {
      return d.toISOString().split('T')[0]
    } else if (mode === 'time') {
      return d.toTimeString().slice(0, 5)
    } else {
      return d.toISOString().slice(0, 16)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onValueChange) {
      const newDate = new Date(e.target.value)
      if (!isNaN(newDate.getTime())) {
        onValueChange(newDate)
      }
    }
  }

  const inputType = mode === 'date' ? 'date' : mode === 'time' ? 'time' : 'datetime-local'

  return (
    <input
      {...commonProps}
      {...finalRestProps}
      type={inputType}
      value={formatDateForInput(value)}
      onChange={handleChange}
      min={formatMinMaxForInput(minimumDate)}
      max={formatMinMaxForInput(maximumDate)}
      disabled={disabled}
    />
  )
})


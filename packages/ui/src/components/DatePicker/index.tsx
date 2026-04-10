import { memo } from 'react'
import type { ChangeEventHandler } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

export type DatePickerMode = 'date' | 'time' | 'dateAndTime'
export type DatePickerDisplayedComponent = 'date' | 'hourAndMinute'

function resolveMode(
  mode: DatePickerMode | undefined,
  displayedComponents: DatePickerDisplayedComponent[] | undefined
): DatePickerMode {
  if (displayedComponents?.includes('date') && displayedComponents.includes('hourAndMinute')) {
    return 'dateAndTime'
  }

  if (displayedComponents?.includes('hourAndMinute')) {
    return 'time'
  }

  if (displayedComponents?.includes('date')) {
    return 'date'
  }

  return mode ?? 'date'
}

function resolveInputType(mode: DatePickerMode) {
  return mode === 'dateAndTime' ? 'datetime-local' : mode
}

/**
 * A control for selecting dates and times.
 *
 * DatePicker is backed by a native date/time input so it keeps standard form
 * semantics, keyboard behavior, and browser validation.
 *
 * Values are passed as native input strings:
 * - `date` -> `YYYY-MM-DD`
 * - `time` -> `HH:MM`
 * - `dateAndTime` -> `YYYY-MM-DDTHH:MM`
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value="2026-04-10"
 *   onValueChange={setDate}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/datepicker
 */
export interface IDatePickerProps extends Omit<
  IBaseElementComponent<'input'>,
  'type' | 'value' | 'defaultValue' | 'onChange' | 'children' | 'min' | 'max'
> {
  /**
   * The current native input value.
   */
  value?: string
  /**
   * The initial native input value when uncontrolled.
   */
  defaultValue?: string
  /**
   * Native input change handler.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /**
   * Value-first change handler for SwiftUI-style ergonomics.
   */
  onValueChange?: (value: string) => void
  /**
   * The minimum selectable value, expressed in the same native input format as `value`.
   */
  min?: string
  /**
   * The maximum selectable value, expressed in the same native input format as `value`.
   */
  max?: string
  /**
   * Backward-compatible minimum alias for SwiftUI-style callers.
   */
  minimumDate?: string
  /**
   * Backward-compatible maximum alias for SwiftUI-style callers.
   */
  maximumDate?: string
  /**
   * The display mode of the date picker.
   *
   * @default 'date'
   */
  mode?: DatePickerMode
  /**
   * SwiftUI-style displayed components. When provided, these values determine the native input type.
   */
  displayedComponents?: DatePickerDisplayedComponent[]
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
    defaultValue,
    onChange,
    onValueChange,
    min,
    max,
    minimumDate,
    maximumDate,
    mode = 'date',
    displayedComponents,
    disabled = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('datepicker'),
  })

  const resolvedMode = resolveMode(mode, displayedComponents)
  const inputType = resolveInputType(resolvedMode)
  const isControlled = value !== undefined
  const resolvedMin = min ?? minimumDate
  const resolvedMax = max ?? maximumDate

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event)
    onValueChange?.(event.currentTarget.value)
  }

  return (
    <input
      key={`${isControlled ? 'controlled' : 'uncontrolled'}-${inputType}`}
      {...commonProps}
      {...finalRestProps}
      type={inputType}
      value={isControlled ? value : undefined}
      defaultValue={isControlled ? undefined : defaultValue}
      onChange={handleChange}
      min={resolvedMin}
      max={resolvedMax}
      disabled={disabled}
    />
  )
})

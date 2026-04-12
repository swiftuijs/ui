import { memo, useId, useState } from 'react'
import type { ChangeEventHandler } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseElementComponent } from '@/types'

import './style.scss'

function sortDates(values: string[]) {
  return [...values].sort((left, right) => left.localeCompare(right))
}

function toggleDate(values: string[], nextValue: string) {
  if (!nextValue) {
    return values
  }

  return values.includes(nextValue)
    ? values.filter((value) => value !== nextValue)
    : sortDates([...values, nextValue])
}

export interface IMultiDatePickerProps
  extends Omit<IBaseElementComponent<'div'>, 'children' | 'defaultValue' | 'onChange'> {
  /**
   * Accessible label rendered with the control.
   */
  label: string
  /**
   * Controlled selected dates using native date input values.
   */
  value?: string[]
  /**
   * Optional form field name used for repeated hidden inputs.
   */
  name?: string
  /**
   * Uncontrolled selected dates using native date input values.
   */
  defaultValue?: string[]
  /**
   * Native change handler for the embedded date input.
   */
  onChange?: ChangeEventHandler<HTMLInputElement>
  /**
   * SwiftUI-style callback with the full selected date set.
   */
  onValueChange?: (value: string[]) => void
  /**
   * Native minimum selectable value.
   */
  min?: string
  /**
   * Native maximum selectable value.
   */
  max?: string
  /**
   * SwiftUI-style minimum alias.
   */
  minimumDate?: string
  /**
   * SwiftUI-style maximum alias.
   */
  maximumDate?: string
  /**
   * Disables date entry and chip removal.
   */
  disabled?: boolean
}

/**
 * MultiDatePicker adapts SwiftUI's multi-date selection control to the web by
 * layering repeated native date picking over an ordered selection list.
 *
 * @see https://developer.apple.com/documentation/swiftui/multidatepicker
 */
export const MultiDatePicker = memo(function MultiDatePicker(props: IMultiDatePickerProps) {
  const {
    label,
    value,
    defaultValue = [],
    onChange,
    onValueChange,
    min,
    max,
    minimumDate,
    maximumDate,
    disabled = false,
    name,
    ...restProps
  } = props
  const inputId = useId()
  const [uncontrolledValue, setUncontrolledValue] = useState(() => sortDates(defaultValue))
  const [draftValue, setDraftValue] = useState('')
  const isControlled = value !== undefined
  const selectedDates = isControlled ? sortDates(value) : uncontrolledValue

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('multidatepicker'),
  })

  const commitDates = (nextValue: string[]) => {
    if (!isControlled) {
      setUncontrolledValue(nextValue)
    }

    onValueChange?.(nextValue)
  }

  const handleInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    onChange?.(event)
    const nextDraftValue = event.currentTarget.value
    setDraftValue(nextDraftValue)

    if (!nextDraftValue) {
      return
    }

    commitDates(toggleDate(selectedDates, nextDraftValue))
    setDraftValue('')
  }

  const handleRemove = (date: string) => {
    if (disabled) {
      return
    }

    commitDates(selectedDates.filter((value) => value !== date))
  }

  return (
    <div {...commonProps} {...finalRestProps}>
      <label className={prefixClass('multidatepicker-label')} htmlFor={inputId}>
        {label}
      </label>
      <input
        className={prefixClass('multidatepicker-input')}
        disabled={disabled}
        id={inputId}
        max={max ?? maximumDate}
        min={min ?? minimumDate}
        onChange={handleInputChange}
        type="date"
        value={draftValue}
      />
      {name ? (
        <div className={prefixClass('multidatepicker-hidden-inputs')} aria-hidden="true">
          {selectedDates.map((selectedDate) => (
            <input
              key={selectedDate}
              name={name}
              type="hidden"
              value={selectedDate}
            />
          ))}
        </div>
      ) : null}
      <ul className={prefixClass('multidatepicker-list')}>
        {selectedDates.map((selectedDate) => (
          <li key={selectedDate} className={prefixClass('multidatepicker-item')}>
            <span className={prefixClass('multidatepicker-value')}>{selectedDate}</span>
            <button
              aria-label={`Remove ${selectedDate}`}
              className={prefixClass('multidatepicker-remove')}
              disabled={disabled}
              onClick={() => handleRemove(selectedDate)}
              type="button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
})

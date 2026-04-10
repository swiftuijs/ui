import { memo } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A control for selecting from a set of mutually exclusive values.
 *
 * Use Picker to create a dropdown menu that allows users to select from a list of options.
 *
 * @example
 * ```tsx
 * <Picker
 *   selectedValue={selected}
 *   onValueChange={setSelected}
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/picker
 */
export interface IPickerOption {
  /**
   * The value of the option.
   */
  value: string | number
  /**
   * The display label for the option.
   */
  label: string
}

export interface IPickerProps extends Omit<
  IBaseElementComponent<'select'>,
  'value' | 'defaultValue' | 'onChange' | 'children' | 'disabled' | 'multiple' | 'size'
> {
  /**
   * The currently selected value.
   */
  selectedValue?: string | number
  /**
   * Callback fired when the selection changes.
   */
  onValueChange?: (value: string | number) => void
  /**
   * The list of options to display.
   */
  options: IPickerOption[]
  /**
   * Placeholder text when no option is selected.
   */
  placeholder?: string
  /**
   * Whether the picker is disabled.
   *
   * @default false
   */
  disabled?: boolean
}

function validatePickerOptions(options: IPickerOption[]) {
  const normalizedValues = options.map((option) => String(option.value))

  if (normalizedValues.includes('')) {
    throw new Error('Picker option values must not use the reserved empty string placeholder value.')
  }

  const hasDuplicateNormalizedValues = normalizedValues.some(
    (value, index) => normalizedValues.indexOf(value) !== index
  )

  if (hasDuplicateNormalizedValues) {
    throw new Error('Picker option values must be unique after string coercion.')
  }
}

export const Picker = memo(function Picker(props: IPickerProps) {
  const {
    selectedValue,
    onValueChange,
    options,
    placeholder = 'Select an option',
    disabled = false,
    ...restProps
  } = props

  validatePickerOptions(options)

  const isControlled = selectedValue !== undefined

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('picker')
  })

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    if (!onValueChange) {
      return
    }

    const option = options.find((item) => String(item.value) === event.currentTarget.value)

    if (option) {
      onValueChange(option.value)
    }
  }

  return (
    <select
      key={isControlled ? 'controlled' : 'uncontrolled'}
      {...commonProps}
      {...finalRestProps}
      value={isControlled ? String(selectedValue) : undefined}
      defaultValue={isControlled ? undefined : ''}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="" disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={String(option.value)} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  )
})

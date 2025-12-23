import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

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

export interface IPickerProps extends IBaseComponent {
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

export const Picker = memo(function Picker(props: IPickerProps) {
  const {
    selectedValue,
    onValueChange,
    options,
    placeholder = 'Select an option',
    disabled = false,
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('picker')
  })

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onValueChange) {
      const value = e.target.value
      const option = options.find(opt => String(opt.value) === value)
      if (option) {
        onValueChange(option.value)
      }
    }
  }

  return (
    <select
      {...commonProps}
      {...finalRestProps}
      value={selectedValue !== undefined ? String(selectedValue) : ''}
      onChange={handleChange}
      disabled={disabled}
    >
      <option value="" disabled>
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


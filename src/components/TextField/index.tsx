import { memo } from 'react'
import type { IBaseElementComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A control that displays an editable text interface.
 * 
 * Use TextField to gather text input from the user. TextField supports
 * single-line text input with optional placeholder and validation.
 * 
 * @example
 * ```tsx
 * <TextField
 *   placeholder="Enter your name"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/textfield
 */
export interface ITextFieldProps extends Omit<IBaseElementComponent<'input'>, 'type' | 'children'> {
  /**
   * The current value of the text field.
   */
  value?: string
  /**
   * Callback fired when the value changes.
   */
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  /**
   * Placeholder text displayed when the field is empty.
   */
  placeholder?: string
  /**
   * Whether the text field is disabled.
   * 
   * @default false
   */
  disabled?: boolean
  /**
   * The type of input. Defaults to 'text'.
   * 
   * @default 'text'
   */
  type?: 'text' | 'email' | 'tel' | 'url' | 'search' | 'password'
}

export const TextField = memo(function TextField(props: ITextFieldProps) {
  const {
    value,
    onChange,
    placeholder,
    disabled = false,
    type = 'text',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('textfield')
  })

  return (
    <input
      {...commonProps}
      {...finalRestProps}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
    />
  )
})


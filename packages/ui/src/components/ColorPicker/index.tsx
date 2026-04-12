import { memo, useId } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A control that lets people pick a color value.
 *
 * @see https://developer.apple.com/documentation/swiftui/colorpicker
 */
export interface IColorPickerProps extends IBaseComponent {
  /**
   * Accessible label shown next to the color control.
   */
  label: string
  /**
   * Current color value.
   */
  value: string
  /**
   * Called when the selected color changes.
   */
  onChange: (value: string) => void
}

export const ColorPicker = memo(function ColorPicker(props: IColorPickerProps) {
  const { label, value, onChange, ...restProps } = props
  const inputId = useId()
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('colorpicker'),
  })

  return (
    <label {...commonProps} {...finalRestProps} htmlFor={inputId}>
      <span className={prefixClass('colorpicker-label')}>{label}</span>
      <input
        className={prefixClass('colorpicker-input')}
        id={inputId}
        onChange={(event) => onChange(event.target.value)}
        type="color"
        value={value}
      />
    </label>
  )
})

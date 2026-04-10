import { memo } from 'react'
import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A control that toggles between on and off states.
 * 
 * Use Toggle to create a switch that users can tap to toggle a setting on or off.
 * 
 * @example
 * ```tsx
 * <Toggle
 *   isOn={enabled}
 *   onChange={(value) => setEnabled(value)}
 * />
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/toggle
 */
export interface IToggleProps extends Omit<
  IBaseElementComponent<'input'>,
  'type' | 'checked' | 'onChange' | 'children'
> {
  /**
   * Whether the toggle is currently on.
   */
  isOn: boolean
  /**
   * Callback fired when the toggle state changes.
   */
  onChange: (value: boolean) => void
  /**
   * Whether the toggle is disabled.
   * 
   * @default false
   */
  disabled?: boolean
}

export const Toggle = memo(function Toggle(props: IToggleProps) {
  const { isOn, onChange, disabled = false, ...restProps } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('toggle'), isOn && prefixClass('toggle-on'), disabled && prefixClass('toggle-disabled')]
  })

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked)
  }

  return (
    <label
      {...commonProps}
    >
      <input
        {...finalRestProps}
        type="checkbox"
        role="switch"
        checked={isOn}
        onChange={handleChange}
        disabled={disabled}
        className={prefixClass('toggle-input')}
      />
      <div className={prefixClass('toggle-track')}>
        <div className={prefixClass('toggle-thumb')} />
      </div>
    </label>
  )
})

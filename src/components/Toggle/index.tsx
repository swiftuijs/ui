import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

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
export interface IToggleProps extends IBaseComponent {
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
    className: [prefixClass('toggle'), isOn && prefixClass('toggle-on')]
  })

  const handleClick = () => {
    if (!disabled) {
      onChange(!isOn)
    }
  }

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      role="switch"
      aria-checked={isOn}
      aria-disabled={disabled}
      onClick={handleClick}
    >
      <div className={prefixClass('toggle-track')}>
        <div className={prefixClass('toggle-thumb')} />
      </div>
    </div>
  )
})


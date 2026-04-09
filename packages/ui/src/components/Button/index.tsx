import type { IBaseElementComponent } from '@/types'
import { standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A control that performs an action when triggered.
 * 
 * A button consists of a label or an icon, or both. The button's action is defined in the `onClick` handler.
 * 
 * @example
 * ```tsx
 * <Button onClick={() => console.log('Clicked')}>
 *   Click Me
 * </Button>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/button
 */
export type IButtonProps = IBaseElementComponent<'button'>

export function Button(props: IButtonProps) {
  const { type = 'button', ...buttonProps } = props
  const { commonProps, restProps, children } = standardizeProps(buttonProps, {
    className: prefixClass('button')
  })

  return (
    <button type={type} {...commonProps} {...restProps}>{children}</button>
  )
}

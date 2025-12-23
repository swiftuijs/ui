import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * A container that visually groups related content with a border and optional label.
 * 
 * GroupBox is similar to Group but adds visual styling with a border and background.
 * 
 * @example
 * ```tsx
 * <GroupBox label="Settings">
 *   <Text>Setting 1</Text>
 *   <Text>Setting 2</Text>
 * </GroupBox>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/groupbox
 */
export interface IGroupBoxProps extends IBaseComponent {
  /**
   * Optional label for the group box.
   */
  label?: string
}

export const GroupBox = memo(function GroupBox(props: IGroupBoxProps) {
  const { label, ...restProps } = props

  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('groupbox')
  })

  return (
    <div {...commonProps} {...finalRestProps}>
      {label && <div className={prefixClass('groupbox-label')}>{label}</div>}
      <div className={prefixClass('groupbox-content')}>{children}</div>
    </div>
  )
})


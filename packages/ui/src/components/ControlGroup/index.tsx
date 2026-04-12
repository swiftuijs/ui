import { memo, useId, type ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A container that groups related controls together.
 *
 * ControlGroup mirrors SwiftUI's `ControlGroup` by presenting a shared label
 * and arranging actions as a compact cluster.
 *
 * @see https://developer.apple.com/documentation/swiftui/controlgroup
 */
export interface IControlGroupProps extends IBaseComponent {
  /**
   * Optional label shown above or alongside the controls.
   */
  label?: ReactNode
  /**
   * The axis used to arrange the controls.
   *
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical'
}

export const ControlGroup = memo(function ControlGroup(props: IControlGroupProps) {
  const { label, orientation = 'horizontal', ...restProps } = props
  const labelId = useId()
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: [
      prefixClass('controlgroup'),
      prefixClass(`controlgroup-${orientation}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      role="group"
      aria-labelledby={label ? labelId : undefined}
    >
      {label ? (
        <div className={prefixClass('controlgroup-label')} id={labelId}>
          {label}
        </div>
      ) : null}
      <div className={prefixClass('controlgroup-content')}>
        {children}
      </div>
    </div>
  )
})

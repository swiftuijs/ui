import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IContainerBackgroundProps extends IBaseComponent {
  placement?: 'automatic' | 'navigation' | 'window' | 'widget'
  emphasis?: 'regular' | 'secondary' | 'prominent'
}

/**
 * ContainerBackground adapts SwiftUI's containerBackground modifier into an explicit surface wrapper.
 */
export const ContainerBackground = memo(function ContainerBackground(props: IContainerBackgroundProps) {
  const {
    children,
    placement = 'automatic',
    emphasis = 'regular',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('containerbackground'),
      prefixClass(`containerbackground-${emphasis}`),
      prefixClass(`containerbackground-${placement}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-container-background-placement={placement}
      data-container-background-emphasis={emphasis}
    >
      {children}
    </div>
  )
})

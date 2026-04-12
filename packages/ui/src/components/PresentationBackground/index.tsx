import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IPresentationBackgroundProps extends IBaseComponent {
  backgroundStyle?: 'automatic' | 'thinMaterial' | 'regularMaterial' | 'clear'
  shape?: 'automatic' | 'rounded' | 'capsule'
}

/**
 * PresentationBackground adapts SwiftUI's presentationBackground modifier into an explicit wrapper.
 */
export const PresentationBackground = memo(function PresentationBackground(props: IPresentationBackgroundProps) {
  const {
    children,
    backgroundStyle = 'automatic',
    shape = 'automatic',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('presentationbackground'),
      prefixClass(`presentationbackground-${backgroundStyle}`),
      prefixClass(`presentationbackground-shape-${shape}`),
    ],
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-presentation-background-style={backgroundStyle}
      data-presentation-background-shape={shape}
    >
      {children}
    </div>
  )
})

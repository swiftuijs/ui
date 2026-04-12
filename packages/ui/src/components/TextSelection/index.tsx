import { memo, type CSSProperties } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface ITextSelectionProps extends IBaseComponent {
  selection?: 'enabled' | 'disabled'
}

/**
 * TextSelection adapts SwiftUI's textSelection modifier into an explicit web wrapper.
 */
export const TextSelection = memo(function TextSelection(props: ITextSelectionProps) {
  const {
    children,
    selection = 'enabled',
    style,
    ...restProps
  } = props

  const wrapperStyle: CSSProperties = {
    userSelect: selection === 'enabled' ? 'text' : 'none',
    ...style,
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('textselection'),
      selection === 'disabled' && prefixClass('textselection-disabled'),
    ],
    style: wrapperStyle,
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      data-text-selection={selection}
    >
      {children}
    </span>
  )
})

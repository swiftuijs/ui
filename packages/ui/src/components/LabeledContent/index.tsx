import { memo, type ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A view that pairs descriptive text with a related value.
 *
 * @see https://developer.apple.com/documentation/swiftui/labeledcontent
 */
export interface ILabeledContentProps extends IBaseComponent {
  /**
   * The descriptive label shown on the leading side.
   */
  label: ReactNode
  /**
   * The trailing value content.
   */
  value?: ReactNode
}

export const LabeledContent = memo(function LabeledContent(props: ILabeledContentProps) {
  const { label, value, ...restProps } = props
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('labeledcontent'),
  })

  return (
    <div {...commonProps} {...finalRestProps}>
      <span className={prefixClass('labeledcontent-label')}>{label}</span>
      <span className={prefixClass('labeledcontent-value')}>{children ?? value}</span>
    </div>
  )
})

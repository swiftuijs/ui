import { memo, type ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

/**
 * A container view that groups related content.
 * 
 * Use Section to organize content into distinct groups. Sections can have optional headers
 * and are commonly used within List views.
 * 
 * @example
 * ```tsx
 * <Section header={<Text>Section Title</Text>}>
 *   <Text>Section content</Text>
 * </Section>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/section
 */
export interface ISectionProps extends IBaseComponent {
  /**
   * An optional header view for the section.
   * 
   * @default undefined
   */
  header?: ReactNode
}

export const Section = memo(function Section (props: ISectionProps) {
  const { header, ...cProps } = props

  const {commonProps, restProps, children} = standardizeProps(cProps, {
    className: 'sw-section'
  })
  
  return (
    <div {...commonProps} {...restProps}>
      {header && <div className="sw-section-header">{header}</div>}
      {children}
    </div>
  )
})
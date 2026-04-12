import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseElementComponent } from '@/types'

import './style.scss'

export interface IHelpLinkProps extends Omit<IBaseElementComponent<'a'>, 'children' | 'href'> {
  href: string
  label?: string
}

/**
 * A dedicated help affordance aligned with SwiftUI's HelpLink mental model.
 */
export const HelpLink = memo(function HelpLink(props: IHelpLinkProps) {
  const {
    href,
    label = 'Get help',
    target = '_blank',
    rel = 'noreferrer noopener',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('help-link')],
  })

  return (
    <a {...commonProps} {...finalRestProps} href={href} rel={rel} target={target}>
      <span aria-hidden="true" className={prefixClass('help-link-icon')}>?</span>
      <span>{label}</span>
    </a>
  )
})

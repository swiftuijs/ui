import { memo } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseElementComponent } from '@/types'

import './style.scss'

export interface ISettingsLinkProps extends Omit<IBaseElementComponent<'a'>, 'children' | 'href'> {
  href?: string
  label?: string
}

/**
 * A navigation affordance that points toward app settings.
 */
export const SettingsLink = memo(function SettingsLink(props: ISettingsLinkProps) {
  const {
    href = '/settings',
    label = 'Settings',
    ...restProps
  } = props

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('settings-link')],
  })

  return (
    <a {...commonProps} {...finalRestProps} href={href}>
      <span>{label}</span>
      <span aria-hidden="true" className={prefixClass('settings-link-chevron')}>›</span>
    </a>
  )
})

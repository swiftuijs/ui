import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export interface ILinkProps extends IBaseComponent {
  /**
   * next page component or url
   */
  destination: string | URL
  /**
   * link target
   */
  target?: string
}

export function Link (props: ILinkProps) {
  const { destination, ...nProps } = props

  const href = typeof destination === 'string' ? destination : destination.href

  const {commonProps, restProps, children} = standardizeProps(nProps, {
    className: 'sw-link'
  })

  return (
    <a {...commonProps} {...restProps} href={href}>{children}</a>
  )
}
import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

/**
 * A control for navigating to a URL.
 * 
 * Use Link to create a clickable link that navigates to a URL when activated.
 * 
 * @example
 * ```tsx
 * <Link destination="https://example.com" target="_blank">
 *   Visit Example
 * </Link>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/link
 */
export interface ILinkProps extends IBaseComponent {
  /**
   * The destination URL for the link.
   */
  destination: string | URL
  /**
   * The target window or frame for the link.
   * Common values: '_blank', '_self', '_parent', '_top'
   * 
   * @default undefined (uses browser default)
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
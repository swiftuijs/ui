import { memo, type ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * An empty-state presentation for missing content or search results.
 *
 * @see https://developer.apple.com/documentation/swiftui/contentunavailableview
 */
export interface IContentUnavailableViewProps extends IBaseComponent {
  /**
   * The primary title shown to the user.
   */
  title: ReactNode
  /**
   * Supporting text shown below the title.
   */
  description?: ReactNode
  /**
   * Optional leading visual, such as an icon.
   */
  icon?: ReactNode
  /**
   * Optional actions rendered below the copy.
   */
  actions?: ReactNode
}

export const ContentUnavailableView = memo(function ContentUnavailableView(props: IContentUnavailableViewProps) {
  const { title, description, icon, actions, ...restProps } = props
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('contentunavailable'),
  })

  return (
    <section {...commonProps} {...finalRestProps} role="status" aria-live="polite">
      {icon ? <div className={prefixClass('contentunavailable-icon')}>{icon}</div> : null}
      <div className={prefixClass('contentunavailable-title')}>{title}</div>
      {description ? (
        <div className={prefixClass('contentunavailable-description')}>{description}</div>
      ) : null}
      {actions ? <div className={prefixClass('contentunavailable-actions')}>{actions}</div> : null}
    </section>
  )
})

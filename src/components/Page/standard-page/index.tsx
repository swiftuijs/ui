import { forwardRef } from 'react'
import type { IPageBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Props for StandardPage component.
 * 
 * A standard page is the default page type in a NavigationStack.
 */
export interface IStandardProps extends IPageBaseComponent {
  /**
   * The page type. Must be 'page' for StandardPage component.
   * 
   * @default 'page'
   */
  type?: 'page'
}

export const StandardPage = forwardRef(function StandardPage(props: IStandardProps, ref) {
  const { type = 'page', ...pProps } = props
  const { commonProps, restProps, children } = standardizeProps(
    Object.assign({}, pProps),
    {
      className: [prefixClass('page')],
      'data-page-type': type,
    }
  )

  return (
    <div {...commonProps} {...restProps} ref={ref}>
      {children}
    </div>
  )
})

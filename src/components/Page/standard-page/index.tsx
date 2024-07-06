import { forwardRef } from 'react'
import type { IPageBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

export interface IStandardProps extends IPageBaseComponent {  
  /**
   * page type, default to 'page'
   */
  type?: 'page'
}

export const StandardPage = forwardRef(function StandardPage(props: IStandardProps, ref) {
  const { type = 'page', ...pProps } = props
  const { commonProps, restProps, children } = standardizeProps(
    Object.assign({}, pProps),
    {
      className: ['sw-page'],
      'data-page-type': type,
    }
  )

  return (
    <div {...commonProps} {...restProps} ref={ref}>
      {children}
    </div>
  )
})

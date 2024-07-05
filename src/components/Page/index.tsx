import type { IBaseComponent, IPageType } from 'src/types'
import { useRef } from 'react'
import { standardizeProps } from 'src/common'
import { DragBar } from './dragbar'

import './style.scss'

export interface IPageProps extends IBaseComponent {
  /**
   * page type, default to 'page'
   */
  type?: IPageType
}

// const PAGE_TRANSITION_NAME = 'sw-page-transition'

export function Page(props: IPageProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { type = 'page', ...pProps } = props
  const { commonProps, restProps, children} = standardizeProps(
    Object.assign({
      // transitionName: PAGE_TRANSITION_NAME
    }, pProps),
    { className: ['sw-page', `swp-${type}`]}
  )

  return (
    <div {...commonProps} {...restProps} ref={containerRef}>
      {type === 'actionsheet' && <DragBar container={containerRef} /> }

      {children}
    </div>
  )
}

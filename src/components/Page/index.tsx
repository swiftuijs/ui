import { useCallback, type MouseEvent } from 'react'
import type { IBaseComponent, IPageType } from 'src/types'
import { standardizeProps, startViewTransition } from 'src/common'
import { useNaviContext } from 'src/contexts'

import './style.scss'

export interface IPageProps extends IBaseComponent {
  /**
   * page type, default to 'page'
   */
  type?: IPageType
}

// const PAGE_TRANSITION_NAME = 'sw-page-transition'

export function Page(props: IPageProps) {
  const navi = useNaviContext()

  const { type = 'page', ...pProps } = props
  const { commonProps, restProps, children} = standardizeProps(
    Object.assign({
      // transitionName: PAGE_TRANSITION_NAME
    }, pProps),
    { className: ['sw-page', `swp-${type}`]}
  )

  const onClick = useCallback((e: MouseEvent<HTMLElement>) => {
    // @ts-expect-error target should be a htm element
    if (props.type === 'page' || !e.target || e.target.closest('.page-inner')) return
    startViewTransition({
      update: () => navi.removeLast(),
      type: 'backwards',
    })
    return
  }, [props.type, navi])

  return (
    <div {...commonProps} {...restProps} onClick={onClick}>
      <div className="page-inner">
        {children}
      </div>
    </div>
  )
}

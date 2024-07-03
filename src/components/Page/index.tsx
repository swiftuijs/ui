import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'

const PAGE_TRANSITION_NAME = 'sw-page-transition'

export function Page(props: IBaseComponent) {
  const {commonProps, restProps, children} = standardizeProps(
    Object.assign({ transitionName: PAGE_TRANSITION_NAME },props),
    { className: 'sw-page'}
  )
  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}

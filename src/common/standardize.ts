import type { IBaseComponent } from 'src/types'

import { mergeStyle } from './style-utils'


export function standardizeProps<T extends Partial<IBaseComponent>>(props: T, extraProps: Partial<IBaseComponent>) {
  const { style, className, transitionName, children,   ...restProps } = props

  const transitionStyle = transitionName ? { viewTransitionName: transitionName } : {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commonProps: any = mergeStyle({ style: Object.assign({}, style, transitionStyle), className }, extraProps)
  commonProps['data-transition-name'] = transitionName
  return {
    children,
    commonProps,
    restProps,
  }
}
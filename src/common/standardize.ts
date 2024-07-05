import type { IBaseComponent } from 'src/types'

import { mergeStyle } from './style-utils'


export function standardizeProps<T extends Partial<IBaseComponent>>(props: T, extraProps: Partial<IBaseComponent>) {
  // @ts-expect-error temporary fix
  // TODO: use more strict type for alignment
  const { style, className, alignment,  transitionName, children,   ...restProps } = props

  const transitionStyle = transitionName ? { viewTransitionName: transitionName } : {}
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commonProps: any = mergeStyle({ style: Object.assign({}, style, transitionStyle), className}, extraProps)
  commonProps['data-transition-name'] = transitionName
  commonProps['data-alignment'] = alignment
  return {
    children,
    commonProps,
    restProps,
  }
}

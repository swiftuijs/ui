import type { IBaseComponent } from 'src/types'

import { mergeStyleData, IStyleDataProps } from './style-utils'


export function standardizeProps<T extends Partial<IBaseComponent>>(props: T, extraProps: IStyleDataProps) {
  // @ts-expect-error temporary fix
  // TODO: use more strict type for alignment
  const { style, className, alignment, children,   ...restProps } = props

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const commonProps: any = mergeStyleData({ style, className}, extraProps)
  commonProps['data-alignment'] = alignment
  return {
    children,
    commonProps,
    restProps,
  }
}

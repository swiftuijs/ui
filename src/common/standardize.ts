import type { IBaseComponent, EAlignment } from 'src/types'

import { mergeStyleData, IStyleDataProps } from './style-utils'


export function standardizeProps<T extends Partial<IBaseComponent & { alignment?: EAlignment }>>(props: T, extraProps: IStyleDataProps) {
  const { style, className, alignment, children, ...restProps } = props

  const commonProps = mergeStyleData({ style, className }, extraProps)
  // Add alignment as data attribute
  if (alignment) {
    (commonProps as Record<string, unknown>)['data-alignment'] = alignment
  }
  return {
    children,
    commonProps,
    restProps,
  }
}

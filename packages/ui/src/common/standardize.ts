import type { CSSProperties } from 'react'
import type { IBaseComponent, EAlignment } from '@/types'

import { mergeStyleData, IStyleDataProps, standardizeUnit } from './style-utils'

type ICssVariableValue = string | number | false | null | undefined
type ICssVariableMap = Record<`--${string}`, ICssVariableValue>

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

export function createCssVariables(styleVars: ICssVariableMap): CSSProperties | undefined {
  const entries = Object.entries(styleVars).filter(([, value]) => value !== undefined && value !== null && value !== false)

  if (!entries.length) {
    return undefined
  }

  return entries.reduce((styles, [key, value]) => {
    ;(styles as Record<string, string | number>)[key] = value as string | number
    return styles
  }, {} as CSSProperties)
}

export function resolveSpacingValue(spacing?: number | string) {
  if (spacing === undefined) {
    return undefined
  }

  if (typeof spacing === 'string' && /^(xs|sm|md|lg|xl|2xl|3xl)$/.test(spacing)) {
    return `var(--sw-spacing-${spacing})`
  }

  return standardizeUnit(spacing)
}

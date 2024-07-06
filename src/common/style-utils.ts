import type { IBaseComponent, IClsxArgs, IClsObj } from 'src/types'

const CLSX_PREFIX = 'sw-'

/**
 * prefix class name with namespace(prefix)
 * @param className custom class name
 * @returns string with prefix
 */
export function prefixClass(className: string) {
  return `${CLSX_PREFIX}${className}`
}

/**
 * clsx is a tiny (228B) utility for constructing className strings conditionally.
 * @param args
 * @returns
 */
export function clsx(...args: IClsxArgs): string {
  return args.reduce((acc: string[], cur) => {
    if (!cur) return acc
    const curType = typeof cur
    if (curType === 'string') {
      acc.push(cur as string)
      return acc
    }
    if (Array.isArray(cur)) {
      acc.push(clsx(...cur))
      return acc
    }
    if (curType === 'object') {
      Object.keys(cur).forEach(key => {
        const value = (cur as IClsObj)[key]
        if (typeof value === 'function') {
          try {
            if (value()) acc.push(key)
          } catch (error) {
            console.error('clsx object function error', error, value)
          }
        } else {
          if (value) acc.push(key)
        }
      })
      return acc
    }
    if (curType === 'function') {
      try {
        acc.push(clsx((cur as IFn)()))
      } catch (error) {
        console.error('clsx function error', error, cur)
      }
      return acc
    }
    return acc

  }, [] as string[]).join(' ')
}


export interface IDataAttributes {
  /**
   * custom data-* attribute
   */
  [k: `data-${string}`]: string
}


export type IStyleDataProps = Pick<IBaseComponent, 'style' | 'className'> & IDataAttributes

/**
 * get data-* attributes from props
 * @param props props from component props
 * @returns data-* attributes
 */
export function getDataAttributes<T extends IDataAttributes>(props: T) {
  return Object.keys(props).reduce((acc, key) => {
    if (key.startsWith('data-')) {
      // @ts-expect-error fix this
      acc[key] = props[key]
    }
    return acc
  }, {} as IDataAttributes)
}

/**
 * merge style and className
 * @param options props from component props
 * @param computedOptions props computed from context
 * @returns `{ style, className }`
 */
export function mergeStyleData(options: IStyleDataProps,  computedOptions: IStyleDataProps) {
  const result: {
    style?: React.CSSProperties,
    className?: string,
    [k: `data-${string}`]: string
  } = {}

  if (options.style || computedOptions.style) {
    result.style = {...options.style, ...computedOptions.style}
  }
  if (options.className || computedOptions.className) {
    result.className = clsx(options.className, computedOptions.className)
  }
  return Object.assign(result, getDataAttributes(options), getDataAttributes(computedOptions))
}
/**
 * standardize style amount(length, width, height, etc.)
 * @param value value of the unit
 * @param unit style amount unit
 * @returns standardized style amount
 */
export function standardizeUnit(value: number | string, unit: string = 'px') {
  return typeof value === 'number' ? value + unit : value
}


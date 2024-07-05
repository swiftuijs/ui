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




export type IStyleProps = Pick<IBaseComponent, 'style' | 'className'>

/**
 * merge style and className
 * @param options props from component props
 * @param computedOptions props computed from context
 * @returns `{ style, className }`
 */
export function mergeStyle(options: IStyleProps,  computedOptions: IStyleProps) {
  const result: { style?: React.CSSProperties, className?: string } = {}

  if (options.style || computedOptions.style) {
    result.style = {...options.style, ...computedOptions.style}
  }
  if (options.className || computedOptions.className) {
    result.className = clsx(options.className, computedOptions.className)
  }

  return result
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


import { colors } from './colors'
import { motion } from './motion'
import { spacing } from './spacing'
import { typography } from './typography'

type TokenLeaf = string | number
type TokenTree = {
  [key: string]: TokenLeaf | TokenTree
}

export const tokens = {
  colors,
  spacing,
  typography,
  motion,
} as const

export const RESPONSIVE_BREAKPOINTS = {
  mobile: 375,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440,
} as const

export const SIZE_CLASS_REGULAR_MIN = {
  horizontal: RESPONSIVE_BREAKPOINTS.mobile,
  vertical: 667,
} as const

function toKebabCase(segment: string): string {
  return segment.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

function toCssVariableSegment(segment: string): string {
  if (segment === 'colors') {
    return 'color'
  }

  return toKebabCase(segment)
}

function flattenTokens(tree: TokenTree, path: string[] = []): Array<[string, TokenLeaf]> {
  return Object.entries(tree).flatMap(([key, value]) => {
    const nextPath = [...path, key]

    if (typeof value === 'string' || typeof value === 'number') {
      return [[nextPath.join('.'), value]]
    }

    return flattenTokens(value, nextPath)
  })
}

export const tokenCssVariables = Object.fromEntries(
  flattenTokens(tokens).map(([path]) => [
    path,
    `--sw-${path.split('.').map(toCssVariableSegment).join('-')}`,
  ])
) as Readonly<Record<string, string>>

export { colors, motion, spacing, typography }

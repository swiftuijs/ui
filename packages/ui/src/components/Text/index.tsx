import type { IBaseComponent } from '@/types'
import { createCssVariables, standardizeProps, prefixClass } from '@/common'

import './style.scss'

/**
 * A view that displays one or more lines of read-only text.
 * 
 * Use Text to display a string in your app's user interface.
 * The Text view draws a string in a given font, with support for multiple lines, 
 * text truncation, and wrapping.
 * 
 * @example
 * ```tsx
 * <Text lineLimit={2}>
 *   This is a long text that will be truncated after 2 lines
 * </Text>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/text
 */
export interface ITextProps extends IBaseComponent {
  /**
   * The maximum number of lines to use for rendering text.
   * If nil, no line limit applies.
   * 
   * @default undefined (no limit)
   */
  lineLimit?: number
}

export function Text(props: ITextProps) {
  const { lineLimit, ...tProps } = props
  const shouldClamp = typeof lineLimit === 'number' && lineLimit > 0

  const { commonProps, restProps, children } = standardizeProps(tProps, {
    className: [prefixClass('text'), shouldClamp ? 'line-clamp' : false],
    style: createCssVariables({
      '--line-limit': shouldClamp ? lineLimit : undefined,
    }),
  })

  return (
    <span {...commonProps} {...restProps}>
      {children}
    </span>
  )
}

import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

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
  const style = lineLimit ? { '--line-limit': lineLimit } : undefined


  const { commonProps, restProps, children } = standardizeProps(tProps, {
    className: [prefixClass('text'), style ? 'line-clamp' : false ],
    style,
  })

  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}
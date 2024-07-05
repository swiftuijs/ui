import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

export interface ITextProps extends IBaseComponent {
  /**
   * The maximum number of lines to use for rendering text.
   * default to 0, which means no limit.
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
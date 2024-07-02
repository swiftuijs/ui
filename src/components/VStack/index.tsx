import type { IBaseComponent } from 'src/types'
import { mergeStyle, StyleContext } from 'src/common'

import './style.scss'


export function VStack(props: IBaseComponent) {
  const { children, ...styleProps } = props
  const mergedStyle = mergeStyle(styleProps, {
    className: 'sw-vstack'
  })
  return (
    <StyleContext.Provider value={{ boxDirection: 'column' }}>
      <div {...mergedStyle}>
        {children}
      </div>
    </StyleContext.Provider>
  )
}
import type { IBaseComponent } from 'src/types'
import { mergeStyle } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

export function VStack(props: IBaseComponent) {
  const { children, ...styleProps } = props
  const mergedStyle = mergeStyle(styleProps, {
    className: ['sw-vstack', 'sw-container']
  })
  return (
    <LayoutContext.Provider value={{ boxDirection: 'column' }}>
      <div {...mergedStyle}>
        {children}
      </div>
    </LayoutContext.Provider>
  )
}
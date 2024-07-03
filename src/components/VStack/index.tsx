import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

export function VStack(props: IBaseComponent) {
  const {children, commonProps, restProps} = standardizeProps(props, {
    className: ['sw-vstack', 'sw-container']
  })
  return (
    <LayoutContext.Provider value={{ boxDirection: 'column' }}>
      <div {...commonProps} {...restProps}>
        {children}
      </div>
    </LayoutContext.Provider>
  )
}
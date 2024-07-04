import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'
import { LayoutContext } from 'src/contexts'
import { useOverflow } from 'src/hooks'

import './style.scss'

export function VStack(props: IBaseComponent) {
  const {children, commonProps, restProps} = standardizeProps(props, {
    className: ['sw-vstack', 'sw-container']
  })
  const containerRef = useOverflow(props)
  return (
    <LayoutContext.Provider value={{ boxDirection: 'column' }}>
      <div {...commonProps} {...restProps} ref={containerRef}>
        {children}
      </div>
    </LayoutContext.Provider>
  )
}

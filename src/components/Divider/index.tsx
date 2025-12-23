import type { IBaseComponent } from 'src/types'
import { useContext } from 'react'
import { standardizeProps } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

export type IDividerProps = Omit<IBaseComponent, 'children'>

export function Divider (props: IDividerProps) {
  const layoutContext = useContext(LayoutContext)

  const { commonProps, restProps  } = standardizeProps(props, {
    className: `sw-divider ${layoutContext.boxDirection}`
  })
  
  return <div {...commonProps} {...restProps} />
}
import type { IBaseComponent } from 'src/types'
import { standardizeProps, standardizeUnit } from 'src/common'

import './style.scss'

export interface ISpacerProps extends Omit<IBaseComponent, 'children'>{
  minLength?: number | string
}

export function Spacer (props: ISpacerProps) {
  const { minLength, ...sProps } = props

  const {commonProps, restProps} = standardizeProps(sProps, {
    style: {
      '--min-length': standardizeUnit(minLength || 0),
    },
    className: 'sw-spacer'
  })
  
  return (
    <div {...commonProps} {...restProps}/>
  )
}
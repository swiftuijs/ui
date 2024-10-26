import type { ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'

import './style.scss'


export interface ISectionProps extends IBaseComponent {
  header?: ReactNode
}

export function Section (props: ISectionProps) {
  const { ...cProps } = props

  const {commonProps, restProps, children} = standardizeProps(cProps, {
    className: 'sw-section'
  })
  
  return (
    <div {...commonProps} {...restProps}>{children}</div>
  )
}
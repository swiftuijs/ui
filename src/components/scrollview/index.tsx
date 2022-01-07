import React from 'react'

import './style.scss'

export interface IScrollViewProps {
  direction?: 'horizontal' | 'vertical'
  children?: any
}

export function ScrollView (props: IScrollViewProps) {
  const { children, direction, ...rest } = props
  const direct = direction || '.vertical'
  return (
    <div {...rest} className={`sw-scrollview ${direct}`}>
      {children}
    </div>
  )
}
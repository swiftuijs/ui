import React from 'react'

import './style.scss'

export interface IScrollViewProps {
  direction?: 'horizontal' | 'vertical'
  children?: any
}

export function ScrollView (props: IScrollViewProps) {
  const direction = props.direction || '.vertical'
  return (
    <div className={`sw-scrollview ${direction}`}>
      {props.children}
    </div>
  )
}
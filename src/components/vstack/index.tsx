import React from 'react'

import './style.scss'


export function VStack (props: any) {
  const { children, ...rest } = props
  return (
    <div {...rest} className="sw-vstack">
      {children}
    </div>
  )
}
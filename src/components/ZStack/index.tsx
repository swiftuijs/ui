import React from 'react'

import './style.scss'

export function ZStack (props: any) {
  const { children, ...rest } = props
  return (
    <div {...rest} className="sw-zstack">
      {props.children}
    </div>
  )
}
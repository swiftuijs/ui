import React from 'react'

import './style.scss'

export function ZStack (props: any) {
  return (
    <div className="sw-zstack">
      {props.children}
    </div>
  )
}
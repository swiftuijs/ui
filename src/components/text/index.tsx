import React from 'react'

import './style.scss'

export function Text (props: any) {
  return (
    <div className="sw-text">
      {props.children}
    </div>
  )
}
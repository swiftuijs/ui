import React from 'react'

import './style.scss'

export function Text (props: any) {
  const { children, ...rest } = props
  return (
    <div {...rest} className="sw-text">
      {children}
    </div>
  )
}
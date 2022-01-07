import React from 'react'

import './style.scss'


export function VStack (props: any) {
  return (
    <div className="sw-vstack">
      {props.children}
    </div>
  )
}
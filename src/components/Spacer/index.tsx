import React from 'react'

import './style.scss'

export interface ISpacerProps {
  minLength?: number | string
}

export function Spacer (props: ISpacerProps) {
  const minLength = props.minLength || 0
  // @ts-ignore
  const style = {'--min-length': `${isNaN(minLength) ? minLength : minLength + 'px'}`};
  return (
    // @ts-ignore
    <div className="sw-spacer" style={style}></div>
  )
}
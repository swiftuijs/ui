import React from 'react'

import './style.scss'

export interface ISpacerProps {
  minLength?: number | string
}

export function Spacer (props: ISpacerProps) {
  const minLength = props.minLength || 0
  
  const style = {'--min-length': `${typeof minLength === 'string' ? minLength : minLength + 'px'}`};
  return (
    // @ts-expect-error css variable
    <div className="sw-spacer" style={style}></div>
  )
}
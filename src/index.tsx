import React from 'react'
import './style/index.scss';

export * from './components/zstack';
export * from './components/hstack';
export * from './components/vstack';
export * from './components/spacer';
export * from './components/text';
export * from './components/scrollview';

export function Container(props: any) {
  return <div className="sw-page">{props.children}</div>
}
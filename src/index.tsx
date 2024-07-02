import './style/index.scss'
import { IChildren } from './types'
export * from './components'

export function Container(props: { children: IChildren }) {
  return <div className="sw-page">{props.children}</div>
}
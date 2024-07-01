import './style/index.scss';
export * from './components'

export function Container(props: any) {
  return <div className="sw-page">{props.children}</div>
}
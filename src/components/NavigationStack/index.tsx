import type { IBaseComponent, EEdge } from 'src/types'
import { mergeStyle } from 'src/common'

import './style.scss'


export interface INavigationStackProps extends IBaseComponent{
  // ignore safe area padding
  ignoreSafeArea?: boolean | EEdge[]
}

export function NavigationStack (props: INavigationStackProps) {
  const { ignoreSafeArea, ...styleProps } = props
  const edgeStyles:Record<string, number | string> = {}
  if (ignoreSafeArea) {
    // @ts-expect-error fix this
    const edgeVariables: EEdge[] = ignoreSafeArea === true ? ['top', 'right', 'bottom', 'left'] : ignoreSafeArea
    edgeVariables.reduce((acc, edge) => {
      acc[`--safe-area-${edge}`] = 0
      return acc
    }, edgeStyles)
  }

  console.log('ignoreSafeArea', ignoreSafeArea)
  const combinedStyle = mergeStyle(styleProps, {
    style: {
      ...edgeStyles,
    },
    className: 'sw-navigationstack'
  })
  
  return (
    <div {...combinedStyle}>{props.children}</div>
  )
}
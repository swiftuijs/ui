import { useMemo, useCallback } from 'react'
import type { IBaseComponent, EEdge } from 'src/types'
import { standardizeProps } from 'src/common'
import { Page } from 'src/components/Page'
import { useNaviPath } from 'src/contexts'

import './style.scss'

export interface INavigationStackProps extends IBaseComponent{
  // ignore safe area padding
  ignoreSafeArea?: boolean | EEdge[]
  navigationDestination?: string
}

export function NavigationStack (props: INavigationStackProps) {
  const navigationPath = useNaviPath()

  const { ignoreSafeArea, ...nProps } = props
  const edgeStyles:Record<string, number | string> = {}
  if (ignoreSafeArea) {
    // @ts-expect-error fix this
    const edgeVariables: EEdge[] = ignoreSafeArea === true ? ['top', 'right', 'bottom', 'left'] : ignoreSafeArea
    edgeVariables.reduce((acc, edge) => {
      acc[`--safe-area-${edge}`] = 0
      return acc
    }, edgeStyles)
  }

  const HomePage = useCallback(() => (
    <>{props.children}</>
  ), [props.children])

  const pages = useMemo(() => {
    return [{ component: HomePage, type: 'page'}, ...navigationPath]
  }, [navigationPath, HomePage])


  const {commonProps, restProps} = standardizeProps(nProps, {
    style: {
      ...edgeStyles,
    },
    className: 'sw-navigationstack'
  })
  
  return (
    <div {...commonProps} {...restProps}>
      {
        pages.map((page, index) => {
          const PageComponent = page.component
          return (
            <Page key={index}>
              <PageComponent />
            </Page>
          )
        })
      }
    </div>
  )
}


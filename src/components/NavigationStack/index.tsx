import { useMemo } from 'react'
import type { IBaseComponent, EEdge, IPageIem } from 'src/types'
import { standardizeProps, generatePageId } from 'src/common'
import { Page } from 'src/components/Page'
import { useNaviPath } from 'src/contexts'

import './style.scss'

const HOME_PAGE_ID = generatePageId('home')

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

  const homePage: IPageIem = useMemo(() => ({
    component: () => (<>{props.children}</>),
    type: 'page',
    id: HOME_PAGE_ID
  }), [props.children])


  const shownPages: IPageIem[] = useMemo(() => {
    if (!navigationPath.length) {
      return [homePage]
    }
    const idx = navigationPath.findLastIndex((page) => page.type === 'page')
    if (idx === -1) {
      return [homePage, ...navigationPath]
    }
    return navigationPath.slice(idx)
  }, [navigationPath, homePage])


  const {commonProps, restProps} = standardizeProps(nProps, {
    style: {
      ...edgeStyles,
    },
    className: 'sw-navigationstack'
  })

  
  return (
    <div {...commonProps} {...restProps}>
      {
        shownPages.map((page) => {
          const PageComponent = page.component
          return (
            <Page key={page.id} type={page.type}>
              <PageComponent />
            </Page>
          )
        })
      }
    </div>
  )
}


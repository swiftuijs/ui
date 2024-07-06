import { Page } from 'src/components/Page'
import { NaviContext } from 'src/contexts'

import { useViewModel, INavigationStackProps } from './view-model'
import './style.scss'


export type { INavigationStackProps } from './view-model'

export function NavigationStack (props: INavigationStackProps) {
  const { commonProps, restProps, shownPages, contextValue, pageInstances } = useViewModel(props)

  return (
    <NaviContext.Provider value={contextValue.current}>
      <div {...commonProps} {...restProps}>
        {
          shownPages.map((page, index) => {
            const PageComponent = page.component
            // home page or none top most page should not have entering animation
            return (
              <Page
                noEnteringAnimation={index === 0 || index < (shownPages.length - 1)}
                id={page._id}
                ref={(instance) => pageInstances.current[page._id] = instance}
                key={page._id} type={page.type}>
                <PageComponent />
              </Page>
            )
          })
        }
      </div>
    </NaviContext.Provider>
  )
}


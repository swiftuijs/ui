import { Page } from 'src/components/Page'
import { NaviContext } from 'src/contexts'

import { useViewModel, INavigationStackProps } from './view-model'
import './style.scss'

/**
 * A view that presents a stack of views representing a visible path in a navigation hierarchy.
 * 
 * Use NavigationStack to present a hierarchy of views. NavigationStack manages the navigation
 * state and provides methods for pushing and popping views. NavigationLink components within
 * the stack can navigate to other views.
 * 
 * @example
 * ```tsx
 * <NavigationStack>
 *   <VStack>
 *     <NavigationLink destination={DetailPage}>Go to Detail</NavigationLink>
 *   </VStack>
 * </NavigationStack>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/navigationstack
 */
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
                ref={(instance) => { pageInstances.current[page._id] = instance }}
                key={page._id} 
                type={page.type}
                transition={page.transition}
              >
                <PageComponent />
              </Page>
            )
          })
        }
      </div>
    </NaviContext.Provider>
  )
}


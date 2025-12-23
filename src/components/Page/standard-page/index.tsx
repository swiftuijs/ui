import { forwardRef, type ReactNode } from 'react'
import type { IPageBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'
import { useNaviContext } from 'src/contexts'
import { NavigationBar } from 'src/components/NavigationBar'

import './style.scss'

/**
 * Props for StandardPage component.
 * 
 * A standard page is the default page type in a NavigationStack.
 */
export interface IStandardProps extends IPageBaseComponent {
  /**
   * The page type. Must be 'page' for StandardPage component.
   * 
   * @default 'page'
   */
  type?: 'page'
  /**
   * Navigation bar title.
   * When provided, a navigation bar will be displayed at the top of the page.
   */
  navigationTitle?: string
  /**
   * Toolbar items to display on the right side of the navigation bar.
   */
  toolbarItems?: ReactNode
}

export const StandardPage = forwardRef<HTMLDivElement, IStandardProps>(function StandardPage(props, ref) {
  const { type = 'page', navigationTitle, toolbarItems, ...pProps } = props
  const naviContext = useNaviContext()
  const { commonProps, restProps, children } = standardizeProps(
    Object.assign({}, pProps),
    {
      className: [prefixClass('page')],
      'data-page-type': type,
    }
  )

  const showBackButton = naviContext.count() > 0
  const hasNavigationBar = !!navigationTitle

  return (
    <div {...commonProps} {...restProps} ref={ref}>
      {hasNavigationBar && (
        <NavigationBar
          title={navigationTitle}
          showBackButton={showBackButton}
          onBack={() => naviContext.dismiss()}
          toolbarItems={toolbarItems}
        />
      )}
      <div className={hasNavigationBar ? prefixClass('page-content') : undefined}>
        {children}
      </div>
    </div>
  )
})

import { memo, type ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A container that presents sidebar, optional content, and detail columns.
 *
 * @see https://developer.apple.com/documentation/swiftui/navigationsplitview
 */
export interface INavigationSplitViewProps extends IBaseComponent {
  /**
   * Sidebar column content.
   */
  sidebar: ReactNode
  /**
   * Optional middle column content.
   */
  content?: ReactNode
  /**
   * Detail column content.
   */
  detail: ReactNode
  /**
   * Whether the layout should collapse to compact presentation.
   *
   * @default false
   */
  compact?: boolean
  /**
   * Which column remains visible in compact presentation.
   *
   * @default 'detail'
   */
  compactColumn?: 'sidebar' | 'content' | 'detail'
  /**
   * Controls which columns remain visible in regular presentation.
   *
   * @default 'automatic'
   */
  columnVisibility?: 'automatic' | 'all' | 'doubleColumn' | 'detailOnly'
}

function getCompactNode(props: Pick<INavigationSplitViewProps, 'sidebar' | 'content' | 'detail' | 'compactColumn'>) {
  switch (props.compactColumn) {
    case 'sidebar':
      return props.sidebar
    case 'content':
      return props.content ?? props.detail
    case 'detail':
    default:
      return props.detail
  }
}

export const NavigationSplitView = memo(function NavigationSplitView(props: INavigationSplitViewProps) {
  const {
    sidebar,
    content,
    detail,
    compact = false,
    compactColumn = 'detail',
    columnVisibility = 'automatic',
    ...restProps
  } = props
  const resolvedColumnVisibility = columnVisibility === 'automatic' ? 'all' : columnVisibility
  const showSidebar = !compact && resolvedColumnVisibility === 'all'
  const showContent = !compact && content != null && resolvedColumnVisibility !== 'detailOnly'
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('navigationsplitview'),
      compact && prefixClass('navigationsplitview-compact'),
      showContent ? prefixClass('navigationsplitview-three-column') : prefixClass('navigationsplitview-two-column'),
      prefixClass(`navigationsplitview-${resolvedColumnVisibility}`),
    ],
  })

  if (compact) {
    return (
      <div {...commonProps} {...finalRestProps}>
        <main className={prefixClass('navigationsplitview-detail')} role="main">
          {getCompactNode({ sidebar, content, detail, compactColumn })}
        </main>
      </div>
    )
  }

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-column-visibility={resolvedColumnVisibility}
    >
      {showSidebar ? (
        <aside
          aria-label="Sidebar"
          className={prefixClass('navigationsplitview-sidebar')}
          role="complementary"
        >
          {sidebar}
        </aside>
      ) : null}
      {showContent ? (
        <section
          aria-label="Content"
          className={prefixClass('navigationsplitview-content')}
          role="region"
        >
          {content}
        </section>
      ) : null}
      <main className={prefixClass('navigationsplitview-detail')} role="main">
        {detail}
      </main>
    </div>
  )
})

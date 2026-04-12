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
    ...restProps
  } = props
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('navigationsplitview'),
      compact && prefixClass('navigationsplitview-compact'),
      content ? prefixClass('navigationsplitview-three-column') : prefixClass('navigationsplitview-two-column'),
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
    <div {...commonProps} {...finalRestProps}>
      <aside
        aria-label="Sidebar"
        className={prefixClass('navigationsplitview-sidebar')}
        role="complementary"
      >
        {sidebar}
      </aside>
      {content ? (
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

import { memo, useEffect, useMemo, useState, type ReactNode } from 'react'

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
   * Initial compact column for uncontrolled usage.
   *
   * @default 'detail'
   */
  defaultCompactColumn?: 'sidebar' | 'content' | 'detail'
  /**
   * Called when the compact column is normalized by the component.
   */
  onCompactColumnChange?: (column: 'sidebar' | 'content' | 'detail') => void
  /**
   * Controls which columns remain visible in regular presentation.
   *
   * @default 'automatic'
   */
  columnVisibility?: 'automatic' | 'all' | 'doubleColumn' | 'detailOnly'
  /**
   * Initial regular-layout column visibility for uncontrolled usage.
   *
   * @default 'automatic'
   */
  defaultColumnVisibility?: 'automatic' | 'all' | 'doubleColumn' | 'detailOnly'
}

function resolveCompactColumn(
  compactColumn: 'sidebar' | 'content' | 'detail',
  content?: ReactNode,
): 'sidebar' | 'content' | 'detail' {
  if (compactColumn === 'content' && content == null) {
    return 'detail'
  }

  return compactColumn
}

function resolveColumnVisibility(
  columnVisibility: 'automatic' | 'all' | 'doubleColumn' | 'detailOnly',
  content?: ReactNode,
): 'all' | 'doubleColumn' | 'detailOnly' {
  if (columnVisibility === 'automatic') {
    return content == null ? 'doubleColumn' : 'all'
  }

  return columnVisibility
}

function getCompactNode(props: Pick<INavigationSplitViewProps, 'sidebar' | 'content' | 'detail'> & { compactColumn: 'sidebar' | 'content' | 'detail' }) {
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
    compactColumn: controlledCompactColumn,
    defaultCompactColumn = 'detail',
    onCompactColumnChange,
    columnVisibility: controlledColumnVisibility,
    defaultColumnVisibility = 'automatic',
    ...restProps
  } = props
  const [internalCompactColumn] = useState<'sidebar' | 'content' | 'detail'>(defaultCompactColumn)
  const [internalColumnVisibility] = useState<'automatic' | 'all' | 'doubleColumn' | 'detailOnly'>(defaultColumnVisibility)
  const compactColumn = controlledCompactColumn ?? internalCompactColumn
  const columnVisibility = controlledColumnVisibility ?? internalColumnVisibility
  const resolvedCompactColumn = useMemo(
    () => resolveCompactColumn(compactColumn, content),
    [compactColumn, content],
  )
  const resolvedColumnVisibility = useMemo(
    () => resolveColumnVisibility(columnVisibility, content),
    [columnVisibility, content],
  )
  const showSidebar = !compact && (resolvedColumnVisibility === 'all' || (resolvedColumnVisibility === 'doubleColumn' && content == null))
  const showContent = !compact && content != null && resolvedColumnVisibility !== 'detailOnly'

  useEffect(() => {
    if (compact && compactColumn !== resolvedCompactColumn) {
      onCompactColumnChange?.(resolvedCompactColumn)
    }
  }, [compact, compactColumn, onCompactColumnChange, resolvedCompactColumn])

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
      <div
        {...commonProps}
        {...finalRestProps}
        data-compact-column={resolvedCompactColumn}
      >
        <main className={prefixClass('navigationsplitview-detail')} role="main">
          {getCompactNode({ sidebar, content, detail, compactColumn: resolvedCompactColumn })}
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

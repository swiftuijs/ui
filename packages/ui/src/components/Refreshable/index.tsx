import { memo, useState, type ReactNode } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

export interface IRefreshableProps extends IBaseComponent {
  onRefresh: () => Promise<void> | void
  isRefreshing?: boolean
  refreshLabel?: string
  refreshingLabel?: string
  toolbar?: ReactNode
}

/**
 * Refreshable adapts SwiftUI's refresh affordance into an explicit web container.
 */
export const Refreshable = memo(function Refreshable(props: IRefreshableProps) {
  const {
    children,
    isRefreshing,
    onRefresh,
    refreshLabel = 'Refresh content',
    refreshingLabel = 'Refreshing…',
    toolbar,
    ...restProps
  } = props
  const [internalRefreshing, setInternalRefreshing] = useState(false)
  const refreshing = isRefreshing ?? internalRefreshing

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('refreshable'),
      refreshing && prefixClass('refreshable-refreshing'),
    ],
  })

  const handleRefresh = async () => {
    if (refreshing) {
      return
    }

    if (isRefreshing === undefined) {
      setInternalRefreshing(true)
    }

    try {
      await onRefresh()
    } finally {
      if (isRefreshing === undefined) {
        setInternalRefreshing(false)
      }
    }
  }

  return (
    <div {...commonProps} {...finalRestProps}>
      <div className={prefixClass('refreshable-header')}>
        <button
          aria-busy={refreshing}
          className={prefixClass('refreshable-button')}
          onClick={() => {
            void handleRefresh()
          }}
          type="button"
        >
          {refreshing ? refreshingLabel : refreshLabel}
        </button>
        {toolbar ? <div className={prefixClass('refreshable-toolbar')}>{toolbar}</div> : null}
      </div>
      <div className={prefixClass('refreshable-content')}>
        {children}
      </div>
    </div>
  )
})

import { useMemo, useRef, useState, useEffect } from 'react'
import { flushSync } from 'react-dom'
import type { IBaseComponent, IPageItem, ILoosePageItem } from '@/types'
import { standardizeProps, generateUniqueId, eventBus, prefixClass } from '@/common'
import { startViewTransition, isViewTransitionSupported } from '@/common/view-transition'
import { INaviContext } from '@/contexts'
import type { PageHandle } from '@/components/Page'

const HOME_PAGE_ID = generateUniqueId('_index_')

/**
 * Props for NavigationStack component.
 */
export interface INavigationStackProps extends IBaseComponent {
  defaultPath?: ILoosePageItem[]
  onPathChange?: (path: Array<Pick<IPageItem, 'id' | 'type'>>) => void
}

function normalizePage(page: ILoosePageItem): IPageItem {
  const pageType = page.type || 'page'

  return Object.assign({}, page, {
    type: pageType,
    _id: `${pageType}$$${page.id}`,
  })
}

function toPublicPath(path: IPageItem[]) {
  return path.map((page) => ({
    id: page.id,
    type: page.type,
  }))
}

export function useViewModel(props: INavigationStackProps) {
  const { defaultPath, onPathChange } = props
  const initialPath = useMemo(() => (defaultPath ?? []).map(normalizePage), [defaultPath])
  const paths = useRef<IPageItem[]>(initialPath)
  const innerEventPrefix = useRef(`${generateUniqueId('navi')}`)
  const contextValue = useRef<INaviContext>({
    eventPrefix: innerEventPrefix.current,
    append: (page: ILoosePageItem) => eventBus.emit(`${innerEventPrefix.current}.append`, page),
    removeLast: (count: number = 1) => eventBus.emit(`${innerEventPrefix.current}.remove`, count),
    count: () => paths.current.length,
    dismiss: () => eventBus.emit(`${innerEventPrefix.current}.remove`, 1),
  })
  const pageInstances = useRef<Record<string, PageHandle | null>>({})

  const homePage: IPageItem = useMemo(() => ({
    component: () => (<>{props.children}</>),
    type: 'page',
    id: HOME_PAGE_ID,
    _id: `page$$${HOME_PAGE_ID}`,
  }), [props.children])

  const [shownPages, setShownPages] = useState(() => [initialPath[initialPath.length - 1] || homePage])

  useEffect(() => {
    onPathChange?.(toPublicPath(paths.current))
  }, [onPathChange])

  useEffect(() => {
    const eventPrefix = innerEventPrefix.current
    const pageCallbacks: Record<string, () => void> = {}
    // append page
    eventBus.on(`${eventPrefix}.append`, (page: ILoosePageItem) => {
      const currentPaths = paths.current
      const nextNormalizedPage = normalizePage(page)
      const _id = nextNormalizedPage._id
      let nextPage: IPageItem

      const index = currentPaths.findIndex((item) => item._id === _id)
      // already at the end, do nothing
      if (currentPaths.length && index === currentPaths.length - 1) return
      // not in path, append it
      if (index === -1) {
        nextPage = nextNormalizedPage
        // remove all none page items
        let lastPageIndex = currentPaths.findLastIndex((page) => page.type === 'page')
        if (lastPageIndex === -1) {
          lastPageIndex = currentPaths.length - 1
        }
        paths.current = [...currentPaths.slice(0, lastPageIndex + 1), nextPage]
      } else {
        // if page already in path, move it to the end
        nextPage = currentPaths[index]
        const remaining = currentPaths.filter((item) => item._id !== _id)
        paths.current = [...remaining, nextPage]
      }
      onPathChange?.(toPublicPath(paths.current))
      // Use View Transitions API if configured and supported
      const useViewTransition = nextPage.transition?.type === 'view-transition' && isViewTransitionSupported()
      
      if (useViewTransition) {
        // For view transitions, use flushSync to ensure React renders synchronously
        // This allows the browser to capture both old and new snapshots with correct view-transition-names
        startViewTransition({
          update: () => {
            flushSync(() => {
              setShownPages([nextPage])
            })
          },
          type: 'forwards'
        })
      } else {
        // For regular transitions, show both pages and wait for page-entered callback
        if (nextPage.type === 'page') {
          pageCallbacks[nextPage._id] = () => {
            setShownPages([nextPage])
            delete pageCallbacks[nextPage._id]
          }
        }
        setShownPages((prev) => [...prev, nextPage])
      }
    })

    // remove page
    eventBus.on(`${eventPrefix}.remove`, (count: number) => {
      // nothing to remove
      if (!count || !paths.current.length) return
      const currentPage = paths.current[paths.current.length - 1]
      paths.current = paths.current.slice(0, -count)
      const pageInstanceMap = pageInstances.current
      onPathChange?.(toPublicPath(paths.current))

      // current is showing modal, just remove it
      if (currentPage.type !== 'page') {
        if (pageInstanceMap[currentPage._id]) {
          pageInstanceMap[currentPage._id]!.exitPage(() => {
            setShownPages(prev => prev.slice(0, -count))
          })
        } else {
          setShownPages(prev => prev.slice(0, -count))
        }
        return
      }
      // if paths is empty, show home page
      const nextPage = paths.current[paths.current.length - 1] || homePage
      
      // Use View Transitions API if current page configured it and supported
      const useViewTransition = currentPage.transition?.type === 'view-transition' && isViewTransitionSupported()
      
      if (useViewTransition) {
        // For view transitions, use flushSync to ensure React renders synchronously
        startViewTransition({
          update: () => {
            flushSync(() => {
              setShownPages([nextPage])
            })
          },
          type: 'backwards'
        })
      } else {
        setShownPages([nextPage, currentPage])
        // wait new page rendered, then exit last page
        requestIdleCallback(() => {
          if (pageInstanceMap[currentPage._id]) {
            pageInstanceMap[currentPage._id]!.exitPage(() => {
              setShownPages([nextPage])
            })
          } else {
            setShownPages([nextPage])
          }
        })
      }
    })
    // when new page entered, execute page callback, done page append animation
    eventBus.on(`${eventPrefix}.page-entered`, (pageId: string) => {
      pageCallbacks[pageId]?.()
    })

    return () => {
      eventBus.off(`${eventPrefix}.append`)
      eventBus.off(`${eventPrefix}.remove`)
      eventBus.off(`${eventPrefix}.page-entered`)
    }
  }, [homePage, onPathChange])
  
  // clear page instances every time shown pages changed
  pageInstances.current = {}


  const { defaultPath: _defaultPath, onPathChange: _onPathChange, ...layoutProps } = props
  const {commonProps, restProps} = standardizeProps(layoutProps, {
    style: {},
    className: prefixClass('navigationstack')
  })
  return {
    commonProps, restProps, pageInstances,
    shownPages, contextValue,
  }
}

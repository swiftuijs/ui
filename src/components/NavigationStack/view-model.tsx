import { useMemo, useRef, useState, useEffect } from 'react'
import type { IBaseComponent, IPageItem, ILoosePageItem } from 'src/types'
import { standardizeProps, generateUniqueId, eventBus, prefixClass } from 'src/common'
import { INaviContext } from 'src/contexts'
import type { Page } from 'src/components/Page'

const HOME_PAGE_ID = generateUniqueId('_index_')

/**
 * Props for NavigationStack component.
 */
export type INavigationStackProps = IBaseComponent

export function useViewModel(props: INavigationStackProps) {
  const paths = useRef<IPageItem[]>([])
  const innerEventPrefix = useRef(`${generateUniqueId('navi')}`)
  const contextValue = useRef<INaviContext>({
    eventPrefix: innerEventPrefix.current,
    append: (page: ILoosePageItem) => eventBus.emit(`${innerEventPrefix.current}.append`, page),
    removeLast: (count: number = 1) => eventBus.emit(`${innerEventPrefix.current}.remove`, count),
    count: () => paths.current.length,
    dismiss: () => eventBus.emit(`${innerEventPrefix.current}.remove`, 1),
  })
  const pageInstances = useRef<Record<string, Page | null>>({})

  const homePage: IPageItem = useMemo(() => ({
    component: () => (<>{props.children}</>),
    type: 'page',
    id: HOME_PAGE_ID,
    _id: `page$$${HOME_PAGE_ID}`,
  }), [props.children])

  const [shownPages, setShownPages] = useState([homePage])

  useEffect(() => {
    const eventPrefix = innerEventPrefix.current
    const pageCallbacks: Record<string, () => void> = {}
    // append page
    eventBus.on(`${eventPrefix}.append`, (page: ILoosePageItem) => {
      const pageType = page.type || 'page'
      const currentPaths = paths.current
      const _id = `${pageType}$$${page.id}`
      let nextPage: IPageItem

      const index = currentPaths.findIndex((item) => item._id === _id)
      // already at the end, do nothing
      if (currentPaths.length && index === currentPaths.length - 1) return
      // not in path, append it
      if (index === -1) {
        nextPage = Object.assign({}, page, { type: pageType, _id })
        // remove all none page items
        let lastPageIndex = currentPaths.findLastIndex((page) => page.type === 'page')
        if (lastPageIndex === -1) {
          lastPageIndex = currentPaths.length - 1
        }
        paths.current = [...currentPaths.slice(0, lastPageIndex + 1), nextPage]
      } else {
        // if page already in path, move it to the end
        nextPage = currentPaths[index]
        paths.current = [...currentPaths.slice(index, 1), nextPage]
      }
      if (nextPage.type === 'page') {
        pageCallbacks[nextPage._id] = () => {
          setShownPages([nextPage])
          delete pageCallbacks[nextPage._id]
        }
      }
      setShownPages((prev) => [...prev, nextPage])
    })

    // remove page
    eventBus.on(`${eventPrefix}.remove`, (count: number) => {
      // nothing to remove
      if (!count || !paths.current.length) return
      const currentPage = paths.current[paths.current.length - 1]
      paths.current = paths.current.slice(0, -count)
      const pageInstanceMap = pageInstances.current

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
  }, [homePage])
  
  // clear page instances every time shown pages changed
  pageInstances.current = {}


  const {commonProps, restProps} = standardizeProps(props, {
    style: {},
    className: prefixClass('navigationstack')
  })
  return {
    commonProps, restProps, pageInstances,
    shownPages, contextValue,
  }
}
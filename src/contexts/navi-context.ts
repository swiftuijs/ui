/**
 * router related context
 */
import type { IPageIem } from 'src/types'
import { createStore } from 'plain-store'



export const naviStore = createStore<IPageIem[]>([])

export interface INaviContext {
  /**
   * current path
   */
  path: IPageIem[]
  /**
   * append a page to path
   * @param page page item
   */
  append: (page: IPageIem) => void
  /**
   * remove last count pages
   * @param count page count to remove, default is 1
   */
  removeLast: (count?: number) => void
  /**
   * whether path is empty
   */
  isEmpty: boolean
  /**
   * current page count(home page is 0)
   */
  count: number
  /**
   * dismiss current page (back to previous page)
   */
  dismiss: () => void
}

export function useNaviContext(): INaviContext {
  return naviStore.useSelector((path) => ({
    path,
    append: (page: IPageIem) => {
      const pageType = page.type || 'page'
      naviStore.setStore(p => {
        const index = p.findIndex((item) => item.id === page.id && item.type === pageType)
        // not in path, append it
        if (index === -1) {
          return [...p, Object.assign({}, page, { type: pageType })]
        }
        // already at the end
        if (index === p.length - 1) return p
        // if page already in path, move it to the end
        const item = p[index]
        return [...p.slice(index, 1), item]
      })
    },
    removeLast: (count = 1) => {
      naviStore.setStore(p => p.slice(0, -count))
    },
    isEmpty: path.length === 0,
    count: path.length,
    dismiss: () => {
      naviStore.setStore(p => p.slice(0, -1))
    }
  }))
}

export const useNaviPath = naviStore.useStore
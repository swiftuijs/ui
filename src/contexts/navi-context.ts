/**
 * router related context
 */
import type { ComponentType } from 'react'
import { createStore } from 'plain-store'
export interface IPageIem {
  component: ComponentType
  type: 'page' | 'modal'
}

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
      naviStore.setStore(p => [...p, page])
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
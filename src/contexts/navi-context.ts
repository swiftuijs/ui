/**
 * router related context
 */
import { createContext, useContext } from 'react'
import type { IPageItem, ILoosePageItem } from 'src/types'

export interface IWillChangeData {
  changedPage: IPageItem
  intent: 'forwards' | 'backwards'
}


export interface INaviContext {
  /**
   * event prefix for navi context
   */
  eventPrefix: string
  /**
   * append a page to path
   * @param page page item
   */
  append: (page: ILoosePageItem) => void
  /**
   * remove last count pages
   * @param count page count to remove, default is 1
   */
  removeLast: (count?: number) => void
  /**
   * current page count(home page is 0)
   */
  count: () => number
  /**
   * dismiss current page (back to previous page)
   */
  dismiss: () => void
}

export const NaviContext = createContext<INaviContext>({
  eventPrefix: '',
  append: () => { },
  removeLast: () => { },
  count: () => 0,
  dismiss: () => { }
})

export function useNaviContext(): INaviContext {
  return useContext(NaviContext)
}

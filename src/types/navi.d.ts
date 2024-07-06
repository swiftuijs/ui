import type { ComponentType } from 'react'
/**
 * page type
 * * page: normal page
 * * modal: modal page
 * * actionsheet: action sheet page
 */
export type IPageType = 'page' | 'actionsheet'

export interface IPageItem {
  /**
   * page component
   */
  component: ComponentType
  /**
   * page type, default to 'page'
   * * page: normal page
   * * modal: modal page
   * * actionsheet: action sheet page
   */
  type: IPageType
  /**
   * page id, used to identify page
   */
  id: string
  /**
   * inner id, prefixed with type
   */
  _id: string
}
/**
 * loose page item, used by NavigationLink
 */
export type ILoosePageItem = PartialOptional<IPageItem, 'type' | '_id'>
import type { ComponentType } from 'react'
/**
 * page type
 * * page: normal page
 * * modal: modal page
 * * actionsheet: action sheet page
 */
export type IPageType = 'page' | 'modal' | 'actionsheet'

export interface IPageIem {
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
  type?: IPageType
  /**
   * page id, used to identify page
   */
  id: string
}

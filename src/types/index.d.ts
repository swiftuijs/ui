import type { ReactNode, CSSProperties } from 'react'

export type IClsString = string | number | null | undefined;
export type IClsObj = Record<string, unknown>;
export type IClsArr = Array<IClsString | IClsObj | IClsArr>;
/**
 * class name type
 */
export type IClassName = IClsString | IClsObj | IClsArr | IFn
/**
 * types of clsx args
 */
export type IClsxArgs = Array<IClassName>;

/**
 * children of the component
 */
export type IChildren = string | ReactNode | ReactNode[]

/**
 * component base props
 */
export interface IBaseComponent {
  /**
   * The style of the component.
   */
  style?: CSSProperties
  /**
   * The class name of the component.
   */
  className?: IClassName
  /**
   * The children of the component.
   */
  children?: IChildren
}

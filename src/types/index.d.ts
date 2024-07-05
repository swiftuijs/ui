import type { ReactNode, CSSProperties, ComponentProps } from 'react'

export * from './navi'

export type IClsString = string | number | null | undefined | false;
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

  /**
   * view transition name
   */
  transitionName?: string
}

export type IBaseElementComponent<T> = IBaseComponent & ComponentProps<T>

export const enum EEdge {
  TOP = 'top',
  RIGHT = 'right',
  BOTTOM = 'bottom',
  LEFT = 'left',
}

/**
 * An alignment position along the horizontal axis.
 * ref: https://developer.apple.com/documentation/swiftui/alignment
 */
export type EAlignment =
  /** A guide marking the leading edge of the view. */
  'leading' |
  /** A guide marking the horizontal center of the view. */
  'center' |
  /** A guide marking the trailing edge of the view. */
  'trailing' |

  'top' |
  'top-leading' |
  'top-trailing' |

  'bottom' |
  'bottom-leading' |
  'bottom-trailing' |
  'trailing-first-text-baseline' |
  'leading-last-text-baseline'
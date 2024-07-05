import { ComponentType } from 'react';
import { EEdge } from '../../../../../../../../src/types';
import { IBaseComponent } from '../../../../../../../../src/types';
import { IBaseElementComponent } from '../../../../../../../../src/types';
import { IPageType } from '../../../../../../../../src/types';
import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare function Button(props: IButtonProps): JSX_2.Element;

export declare function Divider(props: IDividerProps): JSX_2.Element;

/**
 * An alignment position along the vertical axis.
 */
export declare const enum EVerticalAlignment {
    /** A guide marking the bottom edge of the view. */
    bottom = "bottom",
    /** A guide marking the vertical center of the view. */
    center = "middle",
    /** A guide marking the top edge of the view. */
    top = "top"
}

export declare function HStack(props: IHStackProps): JSX_2.Element;

export declare interface IButtonProps extends IBaseElementComponent<'button'> {
}

export declare interface IDividerProps extends Omit<IBaseComponent, 'children'> {
}

export declare interface IHStackProps extends IBaseComponent {
    /**
     * The guide for aligning the subviews in this stack.
     *  This guide has the same vertical screen coordinate for every child view.
     */
    alignment?: EVerticalAlignment;
    /**
     * The distance between adjacent subviews,
     *  or nil if you want the stack to choose a default distance for each pair of subviews.
     */
    spacing?: number;
}

export declare interface IImageProps extends Omit<IBaseElementComponent<'img'>, 'children'> {
}

declare function Image_2(props: IImageProps): JSX_2.Element;
export { Image_2 as Image }

export declare interface INavigationLinkProps extends IBaseComponent {
    /**
     * next page component or url
     */
    destination?: string | ComponentType;
    pageOptions?: {
        type: IPageType;
    };
    /**
     * dismiss current page (back to previous page)
     */
    dismiss?: boolean;
}

export declare interface INavigationStackProps extends IBaseComponent {
    ignoreSafeArea?: boolean | EEdge[];
    navigationDestination?: string;
}

export declare interface IScrollViewProps extends IBaseComponent {
    direction?: 'horizontal' | 'vertical';
}

export declare interface ISpacerProps extends Omit<IBaseComponent, 'children'> {
    minLength?: number | string;
}

export declare interface ITextProps extends IBaseComponent {
    /**
     * The maximum number of lines to use for rendering text.
     * default to 0, which means no limit.
     */
    lineLimit?: number;
}

export declare interface IVStackProps extends IBaseComponent {
    /**
     * The distance between adjacent subviews,
     *  or nil if you want the stack to choose a default distance for each pair of subviews.
     */
    spacing?: number;
}

export declare function NavigationLink(props: INavigationLinkProps): JSX_2.Element;

export declare function NavigationStack(props: INavigationStackProps): JSX_2.Element;

export declare function ScrollView(props: IScrollViewProps): JSX_2.Element;

export declare function Spacer(props: ISpacerProps): JSX_2.Element;

declare function Text_2(props: ITextProps): JSX_2.Element;
export { Text_2 as Text }

export declare function VStack(props: IVStackProps): JSX_2.Element;

export declare function ZStack(props: IBaseComponent): JSX_2.Element;

export { }

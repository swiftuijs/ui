import { ComponentType } from 'react';
import { EAlignment } from '../../../../../../../../src/types';
import { IBaseComponent } from '../../../../../../../../src/types';
import { IBaseElementComponent } from '../../../../../../../../src/types';
import { ILoosePageItem } from '../../../../../../../src/types';
import { IPageType } from '../../../../../../../../src/types';
import { JSX as JSX_2 } from 'react/jsx-runtime';
import { ReactNode } from 'react';

export declare function Button(props: IButtonProps): JSX_2.Element;

export declare function Divider(props: IDividerProps): JSX_2.Element;

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
    alignment?: EAlignment;
    /**
     * The distance between adjacent subviews,
     *  or nil if you want the stack to choose a default distance for each pair of subviews.
     */
    spacing?: number;
}

export declare interface IImageProps extends Omit<IBaseElementComponent<'img'>, 'children'> {
}

export declare interface ILinkProps extends IBaseComponent {
    /**
     * next page component or url
     */
    destination: string | URL;
    /**
     * link target
     */
    target?: string;
}

export declare interface IListProps extends IBaseComponent {
}

declare function Image_2(props: IImageProps): JSX_2.Element;
export { Image_2 as Image }

declare interface INaviContext {
    /**
     * event prefix for navi context
     */
    eventPrefix: string;
    /**
     * append a page to path
     * @param page page item
     */
    append: (page: ILoosePageItem) => void;
    /**
     * remove last count pages
     * @param count page count to remove, default is 1
     */
    removeLast: (count?: number) => void;
    /**
     * current page count(home page is 0)
     */
    count: () => number;
    /**
     * dismiss current page (back to previous page)
     */
    dismiss: () => void;
}

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
}

export declare interface IScrollViewProps extends IBaseComponent {
    /**
     * The direction of the scroll view, default to vertical.
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * Whether to show the scroll bar, default to true.
     */
    showsIndicators?: boolean;
}

export declare interface ISectionProps extends IBaseComponent {
    header?: ReactNode;
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
    alignment?: EAlignment;
    /**
     * The distance between adjacent subviews,
     *  or nil if you want the stack to choose a default distance for each pair of subviews.
     */
    spacing?: number;
}

export declare interface IZStackProps extends IBaseComponent {
    alignment?: EAlignment;
}

export declare function Link(props: ILinkProps): JSX_2.Element;

export declare function List(props: IListProps): JSX_2.Element;

export declare function NavigationLink(props: INavigationLinkProps): JSX_2.Element;

export declare function NavigationStack(props: INavigationStackProps): JSX_2.Element;

export declare function ScrollView(props: IScrollViewProps): JSX_2.Element;

export declare function Section(props: ISectionProps): JSX_2.Element;

export declare function Spacer(props: ISpacerProps): JSX_2.Element;

declare function Text_2(props: ITextProps): JSX_2.Element;
export { Text_2 as Text }

export declare function useNaviContext(): INaviContext;

export declare function VStack(props: IVStackProps): JSX_2.Element;

export declare function ZStack(props: IZStackProps): JSX_2.Element;

export { }

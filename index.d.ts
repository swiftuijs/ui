import { IBaseComponent } from '../../../../../../../../src/types';
import { IChildren } from './types';
import { JSX as JSX_2 } from 'react/jsx-runtime';

export declare function Container(props: {
    children: IChildren;
}): JSX_2.Element;

export declare function Divider(props: IDividerProps): JSX_2.Element;

/**
 * An alignment position along the vertical axis.
 */
export declare enum EVerticalAlignment {
    /** A guide marking the bottom edge of the view. */
    bottom = "bottom",
    /** A guide marking the vertical center of the view. */
    center = "middle",
    /** A guide marking the top edge of the view. */
    top = "top"
}

export declare function HStack(props: IHStackProps): JSX_2.Element;

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

export declare interface IScrollViewProps extends IBaseComponent {
    direction?: 'horizontal' | 'vertical';
}

export declare interface ISpacerProps extends Omit<IBaseComponent, 'children'> {
    minLength?: number | string;
}

export declare function ScrollView(props: IScrollViewProps): JSX_2.Element;

export declare function Spacer(props: ISpacerProps): JSX_2.Element;

declare function Text_2(props: IBaseComponent): JSX_2.Element;
export { Text_2 as Text }

export declare function VStack(props: IBaseComponent): JSX_2.Element;

export declare function ZStack(props: IBaseComponent): JSX_2.Element;

export { }

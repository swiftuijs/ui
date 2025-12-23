import { ComponentType } from 'react';
import { EAlignment } from '../../../../../../../../src/types';
import { IBaseComponent } from '../../../../../../../../src/types';
import { IBaseElementComponent } from '../../../../../../../../src/types';
import { ILoosePageItem } from '../../../../../../../src/types';
import { IPageType } from '../../../../../../../../src/types';
import { JSX } from 'react/jsx-runtime';
import { NamedExoticComponent } from 'react';
import { ReactNode } from 'react';

export declare const ActivityIndicator: NamedExoticComponent<IActivityIndicatorProps>;

export declare const Alert: NamedExoticComponent<IAlertProps>;

export declare const Button: NamedExoticComponent<IButtonProps>;

export declare const Card: NamedExoticComponent<IBaseComponent>;

export declare const DatePicker: NamedExoticComponent<IDatePickerProps>;

export declare const DisclosureGroup: NamedExoticComponent<IDisclosureGroupProps>;

export declare const Divider: NamedExoticComponent<IDividerProps>;

/**
 * Renders an array of items using the provided render function.
 */
export declare function ForEach<T>(props: IForEachProps<T>): JSX.Element;

export declare const Group: NamedExoticComponent<IBaseComponent>;

export declare const GroupBox: NamedExoticComponent<IGroupBoxProps>;

export declare const HStack: NamedExoticComponent<IHStackProps>;

/**
 * A view that shows that a task is in progress.
 *
 * Use ActivityIndicator to show that a task is in progress. It displays a spinning indicator.
 *
 * @example
 * ```tsx
 * <ActivityIndicator />
 * <ActivityIndicator size="large" />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/progressview
 */
export declare interface IActivityIndicatorProps extends IBaseComponent {
    /**
     * The size of the activity indicator.
     *
     * @default 'medium'
     */
    size?: 'small' | 'medium' | 'large';
    /**
     * The color of the activity indicator.
     * Uses accent color by default.
     */
    color?: string;
}

/**
 * A container that presents an alert dialog.
 *
 * Alert displays a modal dialog with a message and optional action buttons.
 *
 * @example
 * ```tsx
 * <Alert
 *   title="Alert"
 *   message="This is an alert message"
 *   isVisible={showAlert}
 *   onDismiss={() => setShowAlert(false)}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/alert
 */
export declare interface IAlertButton {
    /**
     * The label text for the button.
     */
    label: string;
    /**
     * The action to perform when the button is pressed.
     */
    action: () => void;
    /**
     * The style of the button.
     *
     * @default 'default'
     */
    style?: 'default' | 'cancel' | 'destructive';
}

export declare interface IAlertProps extends IBaseComponent {
    /**
     * The title of the alert.
     */
    title: string;
    /**
     * The message body of the alert.
     */
    message?: string;
    /**
     * Whether the alert is visible.
     */
    isVisible: boolean;
    /**
     * Callback fired when the alert should be dismissed.
     */
    onDismiss: () => void;
    /**
     * The buttons to display in the alert.
     */
    buttons?: IAlertButton[];
}

/**
 * A control that performs an action when triggered.
 *
 * A button consists of a label or an icon, or both. The button's action is defined in the `onClick` handler.
 *
 * @example
 * ```tsx
 * <Button onClick={() => console.log('Clicked')}>
 *   Click Me
 * </Button>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/button
 */
export declare type IButtonProps = IBaseElementComponent<'button'>;

/**
 * A container that presents content on a card.
 *
 * Card is a container with elevated styling, typically used to display related content.
 *
 * @example
 * ```tsx
 * <Card>
 *   <Text>Card Content</Text>
 * </Card>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/card
 */
export declare type ICardProps = IBaseComponent;

/**
 * A control for selecting dates.
 *
 * Use DatePicker to create a control that allows users to select a date.
 *
 * @example
 * ```tsx
 * <DatePicker
 *   value={date}
 *   onValueChange={setDate}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/datepicker
 */
export declare interface IDatePickerProps extends IBaseComponent {
    /**
     * The currently selected date.
     */
    value?: Date | string;
    /**
     * Callback fired when the date changes.
     */
    onValueChange?: (date: Date) => void;
    /**
     * The minimum selectable date.
     */
    minimumDate?: Date | string;
    /**
     * The maximum selectable date.
     */
    maximumDate?: Date | string;
    /**
     * The display mode of the date picker.
     *
     * @default 'date'
     */
    mode?: 'date' | 'time' | 'datetime';
    /**
     * Whether the date picker is disabled.
     *
     * @default false
     */
    disabled?: boolean;
}

/**
 * A view that shows or hides its content based on a disclosure state.
 *
 * DisclosureGroup creates an expandable/collapsible section with a toggle control.
 *
 * @example
 * ```tsx
 * <DisclosureGroup label="More Info">
 *   <Text>Hidden content</Text>
 * </DisclosureGroup>
 * ```
 */
export declare interface IDisclosureGroupProps extends IBaseComponent {
    /**
     * The label for the disclosure toggle.
     */
    label: string;
    /**
     * Whether the group is initially expanded.
     *
     * @default false
     */
    defaultExpanded?: boolean;
    /**
     * Controlled expanded state.
     * If provided, the component becomes controlled.
     */
    expanded?: boolean;
    /**
     * Callback fired when the expanded state changes.
     */
    onExpandedChange?: (expanded: boolean) => void;
}

/**
 * A visual element that can be used to separate other content.
 *
 * A Divider draws a line that can be used to separate content in a list or other container.
 * The divider automatically adapts to the layout direction (horizontal or vertical).
 *
 * @example
 * ```tsx
 * <VStack>
 *   <Text>Above</Text>
 *   <Divider />
 *   <Text>Below</Text>
 * </VStack>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/divider
 */
export declare type IDividerProps = Omit<IBaseComponent, 'children'>;

/**
 * A utility function for rendering arrays of data.
 *
 * ForEach is a helper function that maps over an array and renders each item.
 * It's similar to SwiftUI's ForEach view.
 *
 * @example
 * ```tsx
 * <ForEach
 *   data={items}
 *   keyExtractor={(item) => item.id}
 *   renderItem={(item) => <Text>{item.name}</Text>}
 * />
 * ```
 */
export declare interface IForEachProps<T> {
    /**
     * The array of data to iterate over.
     */
    data: T[];
    /**
     * Function to extract a unique key from each item.
     */
    keyExtractor: (item: T, index: number) => string | number;
    /**
     * Function to render each item.
     */
    renderItem: (item: T, index: number) => ReactNode;
}

/**
 * A container that visually groups related content with a border and optional label.
 *
 * GroupBox is similar to Group but adds visual styling with a border and background.
 *
 * @example
 * ```tsx
 * <GroupBox label="Settings">
 *   <Text>Setting 1</Text>
 *   <Text>Setting 2</Text>
 * </GroupBox>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/groupbox
 */
export declare interface IGroupBoxProps extends IBaseComponent {
    /**
     * Optional label for the group box.
     */
    label?: string;
}

/**
 * A container for grouping view content.
 *
 * Group is a transparent container that groups views together without adding visual styling.
 * It's useful for applying modifiers to multiple views at once.
 *
 * @example
 * ```tsx
 * <Group>
 *   <Text>Item 1</Text>
 *   <Text>Item 2</Text>
 * </Group>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/group
 */
export declare type IGroupProps = IBaseComponent;

/**
 * A view that arranges its children in a horizontal line.
 *
 * An HStack is a container view that arranges its child views in a horizontal line.
 * You can customize the spacing between views and the alignment of views within the stack.
 *
 * @example
 * ```tsx
 * <HStack spacing={10} alignment="center">
 *   <Text>Left</Text>
 *   <Text>Right</Text>
 * </HStack>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/hstack
 */
export declare interface IHStackProps extends IBaseComponent {
    /**
     * The guide for aligning the subviews in this stack.
     * This guide has the same vertical screen coordinate for every child view.
     *
     * @default 'center'
     */
    alignment?: EAlignment;
    /**
     * The distance between adjacent subviews, in pixels.
     * If nil, the stack chooses a default distance for each pair of subviews.
     *
     * @default 0
     */
    spacing?: number;
}

/**
 * A view that displays an image.
 *
 * Use Image to display images from various sources, including bundled images,
 * system images, and images from URLs.
 *
 * @example
 * ```tsx
 * <Image src="photo.jpg" alt="A photo" />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/image
 */
export declare type IImageProps = Omit<IBaseElementComponent<'img'>, 'children'>;

/**
 * A container that arranges its children in a horizontal grid, loading them lazily.
 *
 * LazyHGrid creates a horizontal grid layout with lazy loading for performance.
 *
 * @example
 * ```tsx
 * <LazyHGrid rows={2} spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyHGrid>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/lazyhgrid
 */
export declare interface ILazyHGridProps extends IBaseComponent {
    /**
     * Number of rows in the grid.
     *
     * @default 2
     */
    rows?: number;
    /**
     * Spacing between grid items.
     *
     * @default 0
     */
    spacing?: number;
}

/**
 * A container that arranges its children horizontally, loading them lazily.
 *
 * LazyHStack is similar to HStack but only renders children that are visible in the viewport,
 * improving performance for long lists.
 *
 * @example
 * ```tsx
 * <LazyHStack spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyHStack>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/lazyhstack
 */
export declare interface ILazyHStackProps extends IHStackProps {
    /**
     * Estimated width of each item for virtualization.
     * Used to optimize rendering performance.
     */
    estimatedItemWidth?: number;
}

/**
 * A container that arranges its children in a grid, loading them lazily.
 *
 * LazyVGrid creates a vertical grid layout with lazy loading for performance.
 *
 * @example
 * ```tsx
 * <LazyVGrid columns={3} spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyVGrid>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/lazyvgrid
 */
export declare interface ILazyVGridProps extends IBaseComponent {
    /**
     * Number of columns in the grid.
     *
     * @default 2
     */
    columns?: number;
    /**
     * Spacing between grid items.
     *
     * @default 0
     */
    spacing?: number;
}

/**
 * A container that arranges its children vertically, loading them lazily.
 *
 * LazyVStack is similar to VStack but only renders children that are visible in the viewport,
 * improving performance for long lists.
 *
 * @example
 * ```tsx
 * <LazyVStack spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyVStack>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/lazyvstack
 */
export declare interface ILazyVStackProps extends IVStackProps {
    /**
     * Estimated height of each item for virtualization.
     * Used to optimize rendering performance.
     */
    estimatedItemHeight?: number;
}

/**
 * A control for navigating to a URL.
 *
 * Use Link to create a clickable link that navigates to a URL when activated.
 *
 * @example
 * ```tsx
 * <Link destination="https://example.com" target="_blank">
 *   Visit Example
 * </Link>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/link
 */
export declare interface ILinkProps extends IBaseComponent {
    /**
     * The destination URL for the link.
     */
    destination: string | URL;
    /**
     * The target window or frame for the link.
     * Common values: '_blank', '_self', '_parent', '_top'
     *
     * @default undefined (uses browser default)
     */
    target?: string;
}

/**
 * A container that presents rows of data arranged in a single column.
 *
 * Use List to display a collection of data arranged in a single column.
 * Lists work well for displaying data that can be organized into rows.
 *
 * @example
 * ```tsx
 * <List>
 *   <Section header={<Text>Section 1</Text>}>
 *     <Text>Item 1</Text>
 *     <Text>Item 2</Text>
 *   </Section>
 * </List>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/list
 */
export declare type IListProps = IBaseComponent;

declare const Image_2: NamedExoticComponent<IImageProps>;
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

/**
 * A view that controls a navigation presentation.
 *
 * Use NavigationLink to navigate to a destination within a NavigationStack.
 * NavigationLink can navigate to a component or an external URL.
 *
 * @example
 * ```tsx
 * <NavigationLink destination={MyPage} pageOptions={{ type: 'page' }}>
 *   Go to Page
 * </NavigationLink>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/navigationlink
 */
export declare interface INavigationLinkProps extends IBaseComponent {
    /**
     * The destination component or URL to navigate to.
     * If a string is provided, it will navigate to that URL.
     * If a ComponentType is provided, it will navigate to that component within the NavigationStack.
     *
     * @default undefined
     */
    destination?: string | ComponentType;
    /**
     * Options for configuring the page presentation.
     */
    pageOptions?: {
        /**
         * The type of page presentation.
         */
        type: IPageType;
    };
    /**
     * A Boolean value that indicates whether to dismiss the current page.
     * When true, clicking the link will navigate back instead of forward.
     *
     * @default false
     */
    dismiss?: boolean;
}

/**
 * Props for NavigationStack component.
 */
export declare type INavigationStackProps = IBaseComponent;

/**
 * A control for selecting from a set of mutually exclusive values.
 *
 * Use Picker to create a dropdown menu that allows users to select from a list of options.
 *
 * @example
 * ```tsx
 * <Picker
 *   selectedValue={selected}
 *   onValueChange={setSelected}
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' },
 *   ]}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/picker
 */
export declare interface IPickerOption {
    /**
     * The value of the option.
     */
    value: string | number;
    /**
     * The display label for the option.
     */
    label: string;
}

export declare interface IPickerProps extends IBaseComponent {
    /**
     * The currently selected value.
     */
    selectedValue?: string | number;
    /**
     * Callback fired when the selection changes.
     */
    onValueChange?: (value: string | number) => void;
    /**
     * The list of options to display.
     */
    options: IPickerOption[];
    /**
     * Placeholder text when no option is selected.
     */
    placeholder?: string;
    /**
     * Whether the picker is disabled.
     *
     * @default false
     */
    disabled?: boolean;
}

/**
 * A view that shows the progress toward completion of a task.
 *
 * Use ProgressView to display a progress bar that indicates how much of a task has been completed.
 *
 * @example
 * ```tsx
 * <ProgressView progress={0.5} />
 * <ProgressView progress={0.75} total={100} completed={75} />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/progressview
 */
export declare interface IProgressViewProps extends IBaseComponent {
    /**
     * The progress value as a number between 0 and 1.
     * If total and completed are provided, this will be calculated automatically.
     */
    progress?: number;
    /**
     * The total value for calculating progress.
     * Used together with completed to calculate progress percentage.
     */
    total?: number;
    /**
     * The completed value for calculating progress.
     * Used together with total to calculate progress percentage.
     */
    completed?: number;
    /**
     * Whether to show an indeterminate progress indicator.
     *
     * @default false
     */
    indeterminate?: boolean;
}

/**
 * A scrollable view.
 *
 * Use ScrollView to display content that might be larger than the visible area.
 * ScrollView allows users to scroll through content by dragging or using scroll gestures.
 *
 * @example
 * ```tsx
 * <ScrollView direction="vertical" showsIndicators={true}>
 *   <VStack>
 *     <Text>Long content here...</Text>
 *   </VStack>
 * </ScrollView>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/scrollview
 */
export declare interface IScrollViewProps extends IBaseComponent {
    /**
     * The scrollable axis of the scroll view.
     *
     * @default 'vertical'
     */
    direction?: 'horizontal' | 'vertical';
    /**
     * A Boolean value that indicates whether the scroll view displays the scroll indicators.
     *
     * @default true
     */
    showsIndicators?: boolean;
}

/**
 * A container view that groups related content.
 *
 * Use Section to organize content into distinct groups. Sections can have optional headers
 * and are commonly used within List views.
 *
 * @example
 * ```tsx
 * <Section header={<Text>Section Title</Text>}>
 *   <Text>Section content</Text>
 * </Section>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/section
 */
export declare interface ISectionProps extends IBaseComponent {
    /**
     * An optional header view for the section.
     *
     * @default undefined
     */
    header?: ReactNode;
}

/**
 * A control that displays a secure text input field.
 *
 * SecureField is a specialized TextField for password input.
 * It automatically sets the input type to 'password'.
 *
 * @example
 * ```tsx
 * <SecureField
 *   placeholder="Enter password"
 *   value={password}
 *   onChange={(e) => setPassword(e.target.value)}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/securefield
 */
export declare type ISecureFieldProps = Omit<ITextFieldProps, 'type'>;

/**
 * A control for selecting a value from a bounded linear range of values.
 *
 * Use Slider to create a draggable control for selecting a value within a range.
 *
 * @example
 * ```tsx
 * <Slider
 *   value={progress}
 *   onValueChange={setProgress}
 *   min={0}
 *   max={100}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/slider
 */
export declare interface ISliderProps extends IBaseComponent {
    /**
     * The current value of the slider.
     */
    value: number;
    /**
     * Callback fired when the value changes.
     */
    onValueChange: (value: number) => void;
    /**
     * The minimum value of the slider.
     *
     * @default 0
     */
    min?: number;
    /**
     * The maximum value of the slider.
     *
     * @default 100
     */
    max?: number;
    /**
     * The step increment for the slider.
     *
     * @default 1
     */
    step?: number;
    /**
     * Whether the slider is disabled.
     *
     * @default false
     */
    disabled?: boolean;
}

/**
 * A flexible space that expands along the major axis of its parent container.
 *
 * A Spacer expands to make its containing view as large as possible in the direction
 * of the major axis. If multiple spacers are used, they divide the available space equally.
 *
 * @example
 * ```tsx
 * <HStack>
 *   <Text>Left</Text>
 *   <Spacer />
 *   <Text>Right</Text>
 * </HStack>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/spacer
 */
export declare interface ISpacerProps extends Omit<IBaseComponent, 'children'> {
    /**
     * The minimum length of the spacer, in pixels or as a CSS value string.
     *
     * @default 0
     */
    minLength?: number | string;
}

/**
 * A control used to perform semantic increment and decrement actions.
 *
 * Use Stepper to create a control that allows users to increment or decrement a value.
 *
 * @example
 * ```tsx
 * <Stepper
 *   value={count}
 *   onIncrement={() => setCount(count + 1)}
 *   onDecrement={() => setCount(count - 1)}
 *   min={0}
 *   max={10}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/stepper
 */
export declare interface IStepperProps extends IBaseComponent {
    /**
     * The current value.
     */
    value: number;
    /**
     * Callback fired when the increment button is pressed.
     */
    onIncrement: () => void;
    /**
     * Callback fired when the decrement button is pressed.
     */
    onDecrement: () => void;
    /**
     * The minimum value allowed.
     */
    min?: number;
    /**
     * The maximum value allowed.
     */
    max?: number;
    /**
     * The step amount for each increment/decrement.
     *
     * @default 1
     */
    step?: number;
    /**
     * Whether the stepper is disabled.
     *
     * @default false
     */
    disabled?: boolean;
}

/**
 * A control that displays an editable text interface.
 *
 * Use TextField to gather text input from the user. TextField supports
 * single-line text input with optional placeholder and validation.
 *
 * @example
 * ```tsx
 * <TextField
 *   placeholder="Enter your name"
 *   value={name}
 *   onChange={(e) => setName(e.target.value)}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/textfield
 */
export declare interface ITextFieldProps extends Omit<IBaseElementComponent<'input'>, 'type' | 'children'> {
    /**
     * The current value of the text field.
     */
    value?: string;
    /**
     * Callback fired when the value changes.
     */
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    /**
     * Placeholder text displayed when the field is empty.
     */
    placeholder?: string;
    /**
     * Whether the text field is disabled.
     *
     * @default false
     */
    disabled?: boolean;
    /**
     * The type of input. Defaults to 'text'.
     *
     * @default 'text'
     */
    type?: 'text' | 'email' | 'tel' | 'url' | 'search' | 'password';
}

/**
 * A view that displays one or more lines of read-only text.
 *
 * Use Text to display a string in your app's user interface.
 * The Text view draws a string in a given font, with support for multiple lines,
 * text truncation, and wrapping.
 *
 * @example
 * ```tsx
 * <Text lineLimit={2}>
 *   This is a long text that will be truncated after 2 lines
 * </Text>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/text
 */
export declare interface ITextProps extends IBaseComponent {
    /**
     * The maximum number of lines to use for rendering text.
     * If nil, no line limit applies.
     *
     * @default undefined (no limit)
     */
    lineLimit?: number;
}

/**
 * A control that toggles between on and off states.
 *
 * Use Toggle to create a switch that users can tap to toggle a setting on or off.
 *
 * @example
 * ```tsx
 * <Toggle
 *   isOn={enabled}
 *   onChange={(value) => setEnabled(value)}
 * />
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/toggle
 */
export declare interface IToggleProps extends IBaseComponent {
    /**
     * Whether the toggle is currently on.
     */
    isOn: boolean;
    /**
     * Callback fired when the toggle state changes.
     */
    onChange: (value: boolean) => void;
    /**
     * Whether the toggle is disabled.
     *
     * @default false
     */
    disabled?: boolean;
}

/**
 * A view that arranges its children in a vertical line.
 *
 * A VStack is a container view that arranges its child views in a vertical line.
 * You can customize the spacing between views and the alignment of views within the stack.
 *
 * @example
 * ```tsx
 * <VStack spacing={10} alignment="leading">
 *   <Text>First</Text>
 *   <Text>Second</Text>
 * </VStack>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/vstack
 */
export declare interface IVStackProps extends IBaseComponent {
    /**
     * The guide for aligning the subviews in this stack.
     * This guide has the same horizontal screen coordinate for every child view.
     *
     * @default undefined (uses container default)
     */
    alignment?: EAlignment;
    /**
     * The distance between adjacent subviews, in pixels.
     * If nil, the stack chooses a default distance for each pair of subviews.
     *
     * @default 0
     */
    spacing?: number;
}

/**
 * A view that overlays its children, aligning them in both axes.
 *
 * A ZStack overlays child views on top of each other. You can control the alignment
 * of the children within the ZStack.
 *
 * @example
 * ```tsx
 * <ZStack alignment="center">
 *   <Image src="background.jpg" />
 *   <Text>Overlay Text</Text>
 * </ZStack>
 * ```
 *
 * @see https://developer.apple.com/documentation/swiftui/zstack
 */
export declare interface IZStackProps extends IBaseComponent {
    /**
     * The alignment of the children within the ZStack.
     *
     * @default undefined (uses container default)
     */
    alignment?: EAlignment;
}

export declare const LazyHGrid: NamedExoticComponent<ILazyHGridProps>;

export declare const LazyHStack: NamedExoticComponent<ILazyHStackProps>;

export declare const LazyVGrid: NamedExoticComponent<ILazyVGridProps>;

export declare const LazyVStack: NamedExoticComponent<ILazyVStackProps>;

export declare const Link: NamedExoticComponent<ILinkProps>;

export declare const List: NamedExoticComponent<IBaseComponent>;

export declare const NavigationLink: NamedExoticComponent<INavigationLinkProps>;

export declare function NavigationStack(props: INavigationStackProps): JSX.Element;

export declare const Picker: NamedExoticComponent<IPickerProps>;

export declare const ProgressView: NamedExoticComponent<IProgressViewProps>;

export declare const ScrollView: NamedExoticComponent<IScrollViewProps>;

export declare const Section: NamedExoticComponent<ISectionProps>;

export declare const SecureField: NamedExoticComponent<ISecureFieldProps>;

export declare const Slider: NamedExoticComponent<ISliderProps>;

export declare const Spacer: NamedExoticComponent<ISpacerProps>;

export declare const Stepper: NamedExoticComponent<IStepperProps>;

declare const Text_2: NamedExoticComponent<ITextProps>;
export { Text_2 as Text }

export declare const TextField: NamedExoticComponent<ITextFieldProps>;

export declare const Toggle: NamedExoticComponent<IToggleProps>;

export declare function useNaviContext(): INaviContext;

export declare const VStack: NamedExoticComponent<IVStackProps>;

export declare const ZStack: NamedExoticComponent<IZStackProps>;

export { }

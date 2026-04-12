import type { IBaseSplitViewProps } from '../SplitView/BaseSplitView'
import { BaseSplitView } from '../SplitView/BaseSplitView'

/**
 * HSplitView arranges panes side by side, adapting SwiftUI's split container
 * model to a proportional flexbox layout on the web.
 *
 * @see https://developer.apple.com/documentation/swiftui/hsplitview
 */
export type IHSplitViewProps = IBaseSplitViewProps

export function HSplitView(props: IHSplitViewProps) {
  return (
    <BaseSplitView
      orientation="horizontal"
      testId="hsplitview"
      {...props}
    />
  )
}

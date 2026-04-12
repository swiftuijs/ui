import type { IBaseSplitViewProps } from '../SplitView/BaseSplitView'
import { BaseSplitView } from '../SplitView/BaseSplitView'

/**
 * VSplitView arranges panes vertically, adapting SwiftUI's stacked split
 * container model to proportional sections on the web.
 *
 * @see https://developer.apple.com/documentation/swiftui/vsplitview
 */
export type IVSplitViewProps = IBaseSplitViewProps

export function VSplitView(props: IVSplitViewProps) {
  return (
    <BaseSplitView
      orientation="vertical"
      testId="vsplitview"
      {...props}
    />
  )
}

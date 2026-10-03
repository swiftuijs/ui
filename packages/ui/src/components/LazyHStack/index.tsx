import { memo } from 'react'
import type { IHStackProps } from '../HStack'
import { VirtualLayout, type VirtualLayoutOptions } from '../_internal/VirtualLayout'

/** A measured, virtualized horizontal stack. */
export interface ILazyHStackProps extends IHStackProps, Pick<VirtualLayoutOptions, 'overscan'> {
  /** Initial item size in pixels, corrected after measurement. @default 48 */
  estimatedItemWidth?: number
}

export const LazyHStack = memo(function LazyHStack({ estimatedItemWidth, ...props }: ILazyHStackProps) {
  return <VirtualLayout {...props} horizontal={true}
    estimatedItemSize={estimatedItemWidth} layoutClass="lazyhstack" />
})

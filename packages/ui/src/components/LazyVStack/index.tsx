import { memo } from 'react'
import type { IVStackProps } from '../VStack'
import { VirtualLayout, type VirtualLayoutOptions } from '../_internal/VirtualLayout'

/** A measured, virtualized vertical stack. */
export interface ILazyVStackProps extends IVStackProps, Pick<VirtualLayoutOptions, 'overscan'> {
  /** Initial item size in pixels, corrected after measurement. @default 48 */
  estimatedItemHeight?: number
}

export const LazyVStack = memo(function LazyVStack({ estimatedItemHeight, ...props }: ILazyVStackProps) {
  return <VirtualLayout {...props} horizontal={false}
    estimatedItemSize={estimatedItemHeight} layoutClass="lazyvstack" />
})

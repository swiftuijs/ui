import { memo } from 'react'
import type { IBaseComponent } from '@/types'
import { VirtualLayout, type VirtualLayoutOptions } from '../_internal/VirtualLayout'

/** A measured, virtualized horizontal grid. */
export interface ILazyHGridProps extends IBaseComponent, Pick<VirtualLayoutOptions, 'overscan'> {
  /** Number of rows. @default 2 */
  rows?: number
  /** Gap between items in pixels. @default 0 */
  spacing?: number
  /** Initial column width in pixels, corrected after measurement. @default 48 */
  estimatedItemWidth?: number
}

export const LazyHGrid = memo(function LazyHGrid({ rows = 2, estimatedItemWidth, ...props }: ILazyHGridProps) {
  return <VirtualLayout {...props} horizontal={true} lanes={rows}
    estimatedItemSize={estimatedItemWidth} layoutClass="lazyhgrid" />
})

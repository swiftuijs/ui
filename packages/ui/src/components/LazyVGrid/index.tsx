import { memo } from 'react'
import type { IBaseComponent } from '@/types'
import { VirtualLayout, type VirtualLayoutOptions } from '../_internal/VirtualLayout'

/** A measured, virtualized vertical grid. */
export interface ILazyVGridProps extends IBaseComponent, Pick<VirtualLayoutOptions, 'overscan'> {
  /** Number of columns. @default 2 */
  columns?: number
  /** Gap between items in pixels. @default 0 */
  spacing?: number
  /** Initial row height in pixels, corrected after measurement. @default 48 */
  estimatedItemHeight?: number
}

export const LazyVGrid = memo(function LazyVGrid({ columns = 2, estimatedItemHeight, ...props }: ILazyVGridProps) {
  return <VirtualLayout {...props} horizontal={false} lanes={columns}
    estimatedItemSize={estimatedItemHeight} layoutClass="lazyvgrid" />
})

import { memo } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

export interface IScrollTargetProps extends IBaseComponent {
  scrollId: string
}

/**
 * ScrollTarget marks a DOM anchor that can be resolved by ScrollViewReader.
 *
 * @see https://developer.apple.com/documentation/swiftui/scrollviewreader
 */
export const ScrollTarget = memo(function ScrollTarget(props: IScrollTargetProps) {
  const { scrollId, children, ...restProps } = props
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('scroll-target'),
  })

  return (
    <div
      {...commonProps}
      {...finalRestProps}
      data-sw-scroll-id={scrollId}
    >
      {children}
    </div>
  )
})

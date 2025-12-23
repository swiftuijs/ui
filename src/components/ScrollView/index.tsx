import { memo } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

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
export interface IScrollViewProps extends IBaseComponent {
  /**
   * The scrollable axis of the scroll view.
   * 
   * @default 'vertical'
   */
  direction?: 'horizontal' | 'vertical'
  /**
   * A Boolean value that indicates whether the scroll view displays the scroll indicators.
   * 
   * @default true
   */
  showsIndicators?: boolean
}

export const ScrollView = memo(function ScrollView (props: IScrollViewProps) {
  const { direction, showsIndicators = true, ...sProps } = props
  const {commonProps, restProps, children} = standardizeProps(sProps, {
    className: [
      prefixClass('scrollview'),
      direction || 'vertical',
      showsIndicators ? '' : 'no-scroll-bar'
    ]
  })

  
  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
})
import type { IBaseComponent, EAlignment } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

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
export interface IZStackProps extends IBaseComponent {
  /**
   * The alignment of the children within the ZStack.
   * 
   * @default undefined (uses container default)
   */
  alignment?: EAlignment
}

export function ZStack(props: IZStackProps) {
  const { children, commonProps, restProps } = standardizeProps(props, {
    className: [prefixClass('zstack'), prefixClass('container')]
  })
  return (
    <div {...commonProps} {...restProps}>
      {children}
    </div>
  )
}
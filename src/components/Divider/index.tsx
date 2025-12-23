import { memo, useContext } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps } from 'src/common'
import { LayoutContext } from 'src/contexts'

import './style.scss'

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
export type IDividerProps = Omit<IBaseComponent, 'children'>

export const Divider = memo(function Divider (props: IDividerProps) {
  const layoutContext = useContext(LayoutContext)

  const { commonProps, restProps  } = standardizeProps(props, {
    className: `sw-divider ${layoutContext.boxDirection}`
  })
  
  return <div {...commonProps} {...restProps} />
})
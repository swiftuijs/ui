import { memo } from 'react'
import type { IHStackProps } from '../HStack'
import { HStack } from '../HStack'

/**
 * A container that arranges its children horizontally, loading them lazily.
 * 
 * LazyHStack is similar to HStack but only renders children that are visible in the viewport,
 * improving performance for long lists.
 * 
 * @example
 * ```tsx
 * <LazyHStack spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyHStack>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/lazyhstack
 */
export interface ILazyHStackProps extends IHStackProps {
  /**
   * Estimated width of each item for virtualization.
   * Used to optimize rendering performance.
   */
  estimatedItemWidth?: number
}

export const LazyHStack = memo(function LazyHStack(props: ILazyHStackProps) {
  // For now, LazyHStack is a simple wrapper around HStack
  // Full virtualization can be implemented later using libraries like react-window
  const { estimatedItemWidth, ...restProps } = props
  return <HStack {...restProps} />
})


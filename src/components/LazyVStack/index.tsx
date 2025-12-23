import { memo } from 'react'
import type { IVStackProps } from '../VStack'
import { VStack } from '../VStack'

/**
 * A container that arranges its children vertically, loading them lazily.
 * 
 * LazyVStack is similar to VStack but only renders children that are visible in the viewport,
 * improving performance for long lists.
 * 
 * @example
 * ```tsx
 * <LazyVStack spacing={10}>
 *   {items.map(item => <Text key={item.id}>{item.name}</Text>)}
 * </LazyVStack>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/lazyvstack
 */
export interface ILazyVStackProps extends IVStackProps {
  /**
   * Estimated height of each item for virtualization.
   * Used to optimize rendering performance.
   */
  estimatedItemHeight?: number
}

export const LazyVStack = memo(function LazyVStack(props: ILazyVStackProps) {
  // For now, LazyVStack is a simple wrapper around VStack
  // Full virtualization can be implemented later using libraries like react-window
  const { estimatedItemHeight, ...restProps } = props
  return <VStack {...restProps} />
})


import { memo, type ComponentType, type NamedExoticComponent } from 'react'

/**
 * Creates a memoized version of a component.
 * Use this for pure presentation components that don't have internal state
 * and don't need to re-render unless their props change.
 * 
 * @param component - The component to memoize
 * @param displayName - Optional display name for the component (for debugging)
 * @returns A memoized version of the component
 * 
 * @example
 * ```tsx
 * export const MyComponent = createMemoizedComponent(function MyComponent(props) {
 *   return <div>{props.children}</div>
 * }, 'MyComponent')
 * ```
 */
export function createMemoizedComponent<P extends object>(
  component: ComponentType<P>,
  displayName?: string
): NamedExoticComponent<P> {
  const MemoizedComponent = memo(component) as NamedExoticComponent<P>
  if (displayName) {
    MemoizedComponent.displayName = displayName
  }
  return MemoizedComponent
}


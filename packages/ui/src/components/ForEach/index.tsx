import type { ReactNode } from 'react'

/**
 * A utility function for rendering arrays of data.
 * 
 * ForEach is a helper function that maps over an array and renders each item.
 * It's similar to SwiftUI's ForEach view.
 * 
 * @example
 * ```tsx
 * <ForEach
 *   data={items}
 *   keyExtractor={(item) => item.id}
 *   renderItem={(item) => <Text>{item.name}</Text>}
 * />
 * ```
 */
export interface IForEachProps<T> {
  /**
   * The array of data to iterate over.
   */
  data: T[]
  /**
   * Function to extract a unique key from each item.
   */
  keyExtractor: (item: T, index: number) => string | number
  /**
   * Function to render each item.
   */
  renderItem: (item: T, index: number) => ReactNode
}

/**
 * Renders an array of items using the provided render function.
 */
export function ForEach<T>(props: IForEachProps<T>) {
  const { data, keyExtractor, renderItem } = props

  return (
    <>
      {data.map((item, index) => (
        <div key={keyExtractor(item, index)}>
          {renderItem(item, index)}
        </div>
      ))}
    </>
  )
}


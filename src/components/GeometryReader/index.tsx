import { useEffect, useRef, useState, type ReactNode } from 'react'
import type { IBaseComponent } from 'src/types'
import { standardizeProps, prefixClass } from 'src/common'

import './style.scss'

/**
 * Geometry information provided to children
 */
export interface IGeometry {
  /**
   * Container width in pixels
   */
  width: number
  /**
   * Container height in pixels
   */
  height: number
  /**
   * X coordinate of the container (relative to viewport)
   */
  x: number
  /**
   * Y coordinate of the container (relative to viewport)
   */
  y: number
}

/**
 * Props for GeometryReader component
 */
export interface IGeometryReaderProps extends Omit<IBaseComponent, 'children'> {
  /**
   * Render function that receives geometry information
   * @param geometry - Geometry information
   * @returns React node
   */
  children: (geometry: IGeometry) => ReactNode
}

/**
 * A view that provides geometry information to its children.
 * 
 * GeometryReader is similar to SwiftUI's GeometryReader, allowing you to
 * access the size and position of a container and use that information
 * to create responsive layouts.
 * 
 * @example
 * ```tsx
 * <GeometryReader>
 *   {(geometry) => (
 *     <VStack>
 *       <Text>Width: {geometry.width}px</Text>
 *       <Text>Height: {geometry.height}px</Text>
 *     </VStack>
 *   )}
 * </GeometryReader>
 * ```
 * 
 * @example
 * ```tsx
 * <GeometryReader>
 *   {(geometry) => {
 *     const isWide = geometry.width > 600
 *     return isWide ? <HStack>...</HStack> : <VStack>...</VStack>
 *   }}
 * </GeometryReader>
 * ```
 * 
 * @see https://developer.apple.com/documentation/swiftui/geometryreader
 */
export function GeometryReader(props: IGeometryReaderProps) {
  const { children, ...restProps } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const [geometry, setGeometry] = useState<IGeometry>({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  })

  useEffect(() => {
    const container = containerRef.current
    if (!container) {
      return
    }

    const updateGeometry = () => {
      const rect = container.getBoundingClientRect()
      setGeometry({
        width: rect.width,
        height: rect.height,
        x: rect.x,
        y: rect.y,
      })
    }

    // Initial measurement
    updateGeometry()

    // Use ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(updateGeometry)
    resizeObserver.observe(container)

    // Also listen to window resize for position changes
    window.addEventListener('resize', updateGeometry)
    window.addEventListener('scroll', updateGeometry, { passive: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateGeometry)
      window.removeEventListener('scroll', updateGeometry)
    }
  }, [])

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [prefixClass('geometry-reader')],
  })

  return (
    <div {...commonProps} {...finalRestProps} ref={containerRef}>
      {children(geometry)}
    </div>
  )
}


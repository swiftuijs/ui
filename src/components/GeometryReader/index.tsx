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

    let rafId: number | null = null
    let timeoutId: ReturnType<typeof setTimeout> | null = null

    const updateGeometry = () => {
      // Cancel any pending updates
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }

      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect()
        const newGeometry = {
          // Round to prevent sub-pixel flickering
          width: Math.round(rect.width),
          height: Math.round(rect.height),
          x: Math.round(rect.x),
          y: Math.round(rect.y),
        }
        
        // Only update if values actually changed significantly (tolerance of 1px)
        setGeometry((prev) => {
          const widthDiff = Math.abs(prev.width - newGeometry.width)
          const heightDiff = Math.abs(prev.height - newGeometry.height)
          const xDiff = Math.abs(prev.x - newGeometry.x)
          const yDiff = Math.abs(prev.y - newGeometry.y)
          
          // Only update if any dimension changed by more than the tolerance
          if (widthDiff <= 1 && heightDiff <= 1 && xDiff <= 1 && yDiff <= 1) {
            return prev
          }
          return newGeometry
        })
      })
    }

    // Debounced version for ResizeObserver to prevent layout thrashing
    const debouncedUpdate = () => {
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
      timeoutId = setTimeout(updateGeometry, 16) // ~60fps
    }

    // Initial measurement with a small delay to ensure layout is stable
    timeoutId = setTimeout(updateGeometry, 0)

    // Use ResizeObserver to watch for size changes
    const resizeObserver = new ResizeObserver(debouncedUpdate)
    resizeObserver.observe(container)

    // Also listen to window resize for position changes
    window.addEventListener('resize', updateGeometry)
    window.addEventListener('scroll', updateGeometry, { passive: true })

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', updateGeometry)
      window.removeEventListener('scroll', updateGeometry)
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId)
      }
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


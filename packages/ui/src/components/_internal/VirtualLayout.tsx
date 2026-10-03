'use client'

import { Children, isValidElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { defaultRangeExtractor, useVirtualizer, useWindowVirtualizer } from '@tanstack/react-virtual'
import type { IBaseComponent, EAlignment } from '@/types'
import { prefixClass, resolveSpacingValue, standardizeProps } from '@/common'
import { LayoutContext } from '@/contexts'

export interface VirtualLayoutOptions {
  /** Estimated size along the scrolling axis, corrected by measuring mounted items. */
  estimatedItemSize?: number
  /** Extra rows mounted on each side of the viewport. @default 4 */
  overscan?: number
}

interface VirtualLayoutProps extends IBaseComponent, VirtualLayoutOptions {
  horizontal?: boolean
  lanes?: number
  spacing?: number | string
  alignment?: EAlignment
  layoutClass: string
}

/** Shared, measured row virtualization for lazy stacks and grids. */
export function VirtualLayout({ horizontal = false, lanes = 1, spacing = 0, alignment,
  estimatedItemSize = 48, overscan = 4, layoutClass, children, ...props }: VirtualLayoutProps) {
  const rootRef = useRef<HTMLDivElement>(null)
  const items = useMemo(() => Children.toArray(children), [children])
  const laneCount = Number.isFinite(lanes) ? Math.max(1, Math.floor(lanes)) : 1
  const count = Math.ceil(items.length / laneCount)
  const [target, setTarget] = useState<HTMLElement | null>(null)
  const [margin, setMargin] = useState(0)
  const [gap, setGap] = useState(typeof spacing === 'number' ? spacing : 0)
  const [crossSize, setCrossSize] = useState(0)
  const [focusedRow, setFocusedRow] = useState<number | null>(null)
  const keyForRow = useCallback((index: number) => {
    const item = items[index * laneCount]
    return isValidElement(item) ? item.key ?? index : index
  }, [items, laneCount])
  const options = {
    count,
    horizontal,
    estimateSize: () => Number.isFinite(estimatedItemSize) ? Math.max(1, estimatedItemSize) : 48,
    overscan: Number.isFinite(overscan) ? Math.max(1, Math.floor(overscan)) : 4,
    gap: Math.max(0, gap),
    scrollMargin: margin,
    getItemKey: keyForRow,
    // A focused control stays mounted even if the user scrolls it off screen.
    rangeExtractor: (range: Parameters<typeof defaultRangeExtractor>[0]) => {
      const indexes = defaultRangeExtractor(range)
      if (focusedRow !== null && focusedRow < count) {
        for (let index = Math.max(0, focusedRow - 1); index <= Math.min(count - 1, focusedRow + 1); index++) {
          if (!indexes.includes(index)) indexes.push(index)
        }
        indexes.sort((a, b) => a - b)
      }
      return indexes
    },
    initialRect: { width: 640, height: 640 },
    initialOffset: 0,
    measureElement: (element: HTMLDivElement, entry: ResizeObserverEntry | undefined) => {
      if (horizontal) setCrossSize(current => Math.max(current, element.offsetHeight))
      return Math.round(entry?.borderBoxSize?.[0]?.[horizontal ? 'inlineSize' : 'blockSize']
        ?? element[horizontal ? 'offsetWidth' : 'offsetHeight'])
    },
  }
  const elementVirtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
    ...options, getScrollElement: () => target as HTMLDivElement | null, enabled: target !== null,
  })
  const windowVirtualizer = useWindowVirtualizer<HTMLDivElement>({ ...options, enabled: target === null })
  const virtualizer = target ? elementVirtualizer : windowVirtualizer
  const layoutValue = useMemo(() => ({ boxDirection: horizontal ? 'row' as const : 'column' as const }), [horizontal])

  useEffect(() => {
    // Virtual-core caches estimates and gaps; invalidate when layout inputs change.
    virtualizer.measure()
    for (const element of rootRef.current!.children) virtualizer.measureElement(element as HTMLDivElement)
  }, [estimatedItemSize, gap, horizontal, laneCount, virtualizer])

  useEffect(() => {
    const root = rootRef.current!
    let parent = root.parentElement
    while (parent && !/auto|scroll|overlay/.test(
      getComputedStyle(parent)[horizontal ? 'overflowX' : 'overflowY'],
    )) parent = parent.parentElement
    const scroller = parent
    setTarget(scroller)
    const update = () => {
      const rect = root.getBoundingClientRect()
      const parentRect = scroller?.getBoundingClientRect()
      setMargin(horizontal
        ? rect.left - (parentRect?.left ?? 0) + (scroller?.scrollLeft ?? window.scrollX) - (scroller?.clientLeft ?? 0)
        : rect.top - (parentRect?.top ?? 0) + (scroller?.scrollTop ?? window.scrollY) - (scroller?.clientTop ?? 0))
      setGap(parseFloat(getComputedStyle(root).gap) || 0)
    }
    update()
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(update)
    observer?.observe(root)
    if (root.parentElement) observer?.observe(root.parentElement)
    if (scroller && scroller !== root.parentElement) observer?.observe(scroller)
    window.addEventListener('resize', update, { passive: true })
    return () => { observer?.disconnect(); window.removeEventListener('resize', update) }
  }, [horizontal, laneCount, spacing, count])

  const { commonProps, restProps } = standardizeProps({ ...props, alignment }, {
    className: [prefixClass(layoutClass), prefixClass('lazy-layout')],
    style: {
      position: 'relative', flexShrink: 0, gap: resolveSpacingValue(spacing),
      ...(horizontal ? { width: virtualizer.getTotalSize(), height: '100%', minHeight: crossSize }
        : { height: virtualizer.getTotalSize(), width: '100%' }),
    },
  })
  const crossAlignment = alignment === 'leading' || alignment === 'top' ? 'start'
    : alignment === 'trailing' || alignment === 'bottom' ? 'end' : 'center'

  return <LayoutContext.Provider value={layoutValue}>
    <div {...commonProps} {...restProps} ref={rootRef}
      onFocusCapture={event => {
        const row = (event.target as HTMLElement).closest<HTMLElement>('[data-sw-lazy-row]')
        if (row) setFocusedRow(Number(row.dataset.index))
      }}
      onBlurCapture={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) setFocusedRow(null)
      }}>
      {virtualizer.getVirtualItems().map(row => <div key={row.key} data-index={row.index}
        data-sw-lazy-row="" ref={virtualizer.measureElement}
        style={{ position: 'absolute', left: 0, display: 'grid', gap: resolveSpacingValue(spacing),
          ...(horizontal ? { width: 'max-content', gridTemplateRows: `repeat(${laneCount}, max-content)`,
            top: crossAlignment === 'start' ? 0 : crossAlignment === 'end' ? '100%' : '50%',
            transform: `translateX(${row.start - margin}px) translateY(${crossAlignment === 'start' ? '0' : crossAlignment === 'end' ? '-100%' : '-50%'})` }
            : { top: 0, width: '100%', gridTemplateColumns: `repeat(${laneCount}, minmax(0, 1fr))`,
              justifyItems: laneCount === 1 ? crossAlignment : 'stretch',
              transform: `translateY(${row.start - margin}px)` }),
        }}>
        {items.slice(row.index * laneCount, (row.index + 1) * laneCount)}
      </div>)}
    </div>
  </LayoutContext.Provider>
}

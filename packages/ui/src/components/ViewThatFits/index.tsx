import { Children, cloneElement, isValidElement, memo, useEffect, useRef, useState, type ReactElement, type ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * Chooses the first child that fits the available width.
 *
 * This web adaptation uses `data-min-width` hints on child elements to decide
 * which variant should render for the current width.
 *
 * @see https://developer.apple.com/documentation/swiftui/viewthatfits
 */
export interface IViewThatFitsProps extends IBaseComponent {
  /**
   * Explicit width used to evaluate fitting children. When omitted the
   * component observes its container width after hydration.
   */
  width?: number
}

function pickChild(children: ReactNode, width?: number) {
  const nodes = Children.toArray(children)
  if (nodes.length === 0) {
    return null
  }

  if (width === undefined) {
    return nodes[0]
  }

  for (const node of nodes) {
    if (!isValidElement(node)) {
      continue
    }

    const element = node as ReactElement<{ 'data-min-width'?: number | string }>
    const minWidthValue = element.props['data-min-width']
    if (minWidthValue === undefined) {
      return node
    }

    const minWidth = Number(minWidthValue)
    if (Number.isFinite(minWidth) && width >= minWidth) {
      return node
    }
  }

  return nodes.at(-1) ?? null
}

export const ViewThatFits = memo(function ViewThatFits(props: IViewThatFitsProps) {
  const { width, ...restProps } = props
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('viewthatfits'),
  })

  const container = useRef<HTMLDivElement>(null)
  const [measuredWidth, setMeasuredWidth] = useState<number>()
  useEffect(() => {
    if (width !== undefined || !container.current || typeof ResizeObserver === 'undefined') return
    const observer = new ResizeObserver(entries => setMeasuredWidth(entries[0]?.contentRect.width))
    observer.observe(container.current)
    return () => observer.disconnect()
  }, [width])
  const chosenChild = pickChild(children, width ?? measuredWidth)
  const renderedChild = isValidElement(chosenChild)
    ? cloneElement(chosenChild as ReactElement<Record<string, unknown>>, {
        'data-view-that-fits-active': 'true',
      })
    : chosenChild

  return (
    <div ref={container} {...commonProps} {...finalRestProps}>
      {renderedChild}
    </div>
  )
})

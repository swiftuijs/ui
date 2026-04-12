import {
  forwardRef,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import './style.scss'

type PopoverRect = {
  height: number
  left: number
  top: number
  width: number
}

function readAnchorRect(anchor: HTMLElement | null): PopoverRect {
  if (!anchor) {
    return { height: 0, left: 0, top: 0, width: 0 }
  }

  const rect = anchor.getBoundingClientRect()
  return {
    height: rect.height,
    left: rect.left,
    top: rect.top,
    width: rect.width,
  }
}

export interface IPopoverProps extends IBaseComponent {
  /**
   * Controls visibility.
   */
  isPresented: boolean
  /**
   * Anchor element used to position the popover.
   */
  anchorRef: RefObject<HTMLElement | null>
  /**
   * Called when the popover should close.
   */
  onDismiss?: () => void
  /**
   * Edge where the arrow points toward the anchor.
   *
   * @default 'top'
   */
  arrowEdge?: 'top' | 'bottom' | 'leading' | 'trailing'
  /**
   * Match the anchor width.
   *
   * @default false
   */
  matchAnchorWidth?: boolean
}

/**
 * A popover presentation anchored to another view.
 */
export const Popover = forwardRef<HTMLDivElement, IPopoverProps>(function Popover(props, ref) {
  const {
    anchorRef,
    arrowEdge = 'top',
    children,
    isPresented,
    matchAnchorWidth = false,
    onDismiss,
    ...restProps
  } = props

  const [anchorRect, setAnchorRect] = useState<PopoverRect>(() => readAnchorRect(anchorRef.current))

  useEffect(() => {
    if (!isPresented) {
      return
    }

    const updatePosition = () => {
      setAnchorRect(readAnchorRect(anchorRef.current))
    }

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        onDismiss?.()
      }
    }

    const handlePointerDown = (event: MouseEvent) => {
      const target = event.target as Node | null

      if (!target) {
        return
      }

      if (anchorRef.current?.contains(target)) {
        return
      }

      onDismiss?.()
    }

    updatePosition()
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [anchorRef, isPresented, onDismiss])

  const positionStyle = useMemo(() => {
    const base: CSSProperties = {
      left: anchorRect.left,
      top: arrowEdge === 'bottom' ? anchorRect.top - 12 : anchorRect.top + anchorRect.height + 12,
    }

    if (arrowEdge === 'leading') {
      base.left = anchorRect.left + anchorRect.width + 12
      base.top = anchorRect.top
    }

    if (arrowEdge === 'trailing') {
      base.left = anchorRect.left - 12
      base.top = anchorRect.top
      base.transform = 'translateX(-100%)'
    }

    if (matchAnchorWidth) {
      base.width = `${anchorRect.width}px`
    }

    return base
  }, [anchorRect, arrowEdge, matchAnchorWidth])

  if (!isPresented) {
    return null
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('popover'),
      prefixClass(`popover-${arrowEdge}`),
    ],
    style: positionStyle,
  })

  return (
    <div className={prefixClass('popover-layer')}>
      <div
        {...commonProps}
        {...finalRestProps}
        aria-modal="false"
        ref={ref}
        role="dialog"
      >
        <div className={prefixClass('popover-content')}>{children}</div>
      </div>
    </div>
  )
})

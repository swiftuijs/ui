import {
  forwardRef,
  useEffect,
  useMemo,
  useRef,
  useImperativeHandle,
  useState,
  type CSSProperties,
  type RefObject,
} from 'react'
import { createPortal } from 'react-dom'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'

import { useMotionPresence } from '../_internal/use-motion-presence'
import { useViewportFit } from '../_internal/use-viewport-fit'
import { fixedPositionOrigin } from '../_internal/fixed-position-origin'
import { useUIConfig, themeStyle, useGlassAppearance, type GlassSurfaceProps } from '@/contexts/ui-config'
import './style.scss'

type PopoverRect = {
  height: number
  left: number
  top: number
  width: number
}

function readAnchorRect(anchor: HTMLElement | null, host?: HTMLElement | null): PopoverRect {
  if (!anchor) {
    return { height: 0, left: 0, top: 0, width: 0 }
  }

  const rect = anchor.getBoundingClientRect()
  const origin = host ? fixedPositionOrigin(host) : { left: 0, top: 0 }
  return {
    height: rect.height,
    left: rect.left - origin.left,
    top: rect.top - origin.top,
    width: rect.width,
  }
}

export interface IPopoverProps extends IBaseComponent, GlassSurfaceProps {
  /**
   * Controls visibility.
   */
  isPresented: boolean
  /** Accessible name for the popover. */
  title?: string
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
    glass,
    anchorRef,
    arrowEdge = 'top',
    children,
    isPresented,
    title = 'Popover',
    matchAnchorWidth = false,
    onDismiss,
    ...restProps
  } = props

  const popoverRef = useRef<HTMLDivElement>(null)
  const present = useMotionPresence(isPresented, popoverRef)
  useImperativeHandle(ref, () => popoverRef.current!, [])

  const appearance = useGlassAppearance(glass)
  const config = useUIConfig()
  const [portalHost, setPortalHost] = useState<HTMLElement | null>(null)
  const [anchorRect, setAnchorRect] = useState<PopoverRect>(() => readAnchorRect(anchorRef.current))

  useEffect(() => {
    setPortalHost(anchorRef.current?.closest<HTMLElement>('[role="dialog"], [role="alertdialog"]') ?? document.body)
  }, [anchorRef, isPresented])

  useViewportFit(popoverRef, isPresented, anchorRect)

  useEffect(() => {
    if (!isPresented) {
      return
    }

    const updatePosition = () => {
      setAnchorRect(readAnchorRect(anchorRef.current, portalHost))
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

      if (anchorRef.current?.contains(target) || popoverRef.current?.contains(target)) {
        return
      }

      onDismiss?.()
    }

    updatePosition()
    const observer = typeof ResizeObserver === 'undefined' ? undefined : new ResizeObserver(updatePosition)
    if (anchorRef.current) observer?.observe(anchorRef.current)
    if (portalHost) observer?.observe(portalHost)
    window.addEventListener('resize', updatePosition)
    window.addEventListener('scroll', updatePosition, true)
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handlePointerDown)

    return () => {
      observer?.disconnect()
      window.removeEventListener('resize', updatePosition)
      window.removeEventListener('scroll', updatePosition, true)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handlePointerDown)
    }
  }, [anchorRef, isPresented, onDismiss, portalHost])

  const positionStyle = useMemo(() => {
    const base: CSSProperties = {
      left: anchorRect.left,
      top: arrowEdge === 'bottom' ? anchorRect.top - 12 : anchorRect.top + anchorRect.height + 12,
      transform: arrowEdge === 'bottom' ? 'translateY(-100%)' : undefined,
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

  if (!present) {
    return null
  }

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('popover'),
      prefixClass(`popover-${arrowEdge}`),
    ],
    style: { ...themeStyle(config), ...appearance.style, ...positionStyle },
  })

  const layer = (
    <div className={prefixClass('popover-layer')}>
      <div
        {...appearance}
        {...commonProps}
        {...finalRestProps}
        {...(config.theme ? { 'data-theme': config.theme } : {})}
        data-state={isPresented ? 'open' : 'closed'}
        aria-hidden={!isPresented || undefined}
        aria-label={title}
        aria-modal="false"
        ref={popoverRef}
        role="dialog"
      >
        <div className={prefixClass('popover-content')}>{children}</div>
      </div>
    </div>
  )
  return portalHost ? createPortal(layer, portalHost) : layer
})

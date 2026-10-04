import { memo, useEffect, useRef } from 'react'

import { prefixClass, standardizeProps } from '@/common'
import type { IBaseComponent } from '@/types'
import { prefersReducedMotion } from '@/common/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

import './style.scss'

export interface IContentTransitionProps extends IBaseComponent {
  transition?: 'opacity' | 'interpolate' | 'scale'
  active?: boolean
}

/**
 * Briefly emphasizes changed content. Interpolate falls back to an opacity transition.
 */
export const ContentTransition = memo(function ContentTransition(props: IContentTransitionProps) {
  const {
    active = true,
    children,
    transition = 'opacity',
    ...restProps
  } = props
  const ref = useRef<React.ComponentRef<'span'>>(null)
  const reducedMotion = useReducedMotion()
  useEffect(() => {
    const node = ref.current
    if (!node || !active || reducedMotion || typeof window.MutationObserver === 'undefined') return
    let animation: ReturnType<HTMLElement['animate']> | undefined
    const observer = new window.MutationObserver(() => {
      animation?.cancel()
      if (prefersReducedMotion() || !node.animate) return
      const style = getComputedStyle(node)
      const seconds = style.getPropertyValue('--sw-motion-duration-fast').trim()
      const duration = parseFloat(seconds) * (seconds.endsWith('ms') ? 1 : 1000)
      animation = node.animate(transition === 'scale'
        ? [{ opacity: 0.4, scale: '0.96' }, { opacity: 1, scale: '1' }]
        : [{ opacity: 0.4 }, { opacity: 1 }], {
        duration: Number.isFinite(duration) ? Math.max(0, duration) : 150,
        easing: style.getPropertyValue('--sw-motion-easing-standard').trim() || 'cubic-bezier(0.2, 0, 0, 1)',
      })
    })
    observer.observe(node, { childList: true, characterData: true, subtree: true })
    return () => { observer.disconnect(); animation?.cancel() }
  }, [active, transition, reducedMotion])

  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: [
      prefixClass('contenttransition'),
      prefixClass(`contenttransition-${transition}`),
      active && prefixClass('contenttransition-active'),
    ],
  })

  return (
    <span
      {...commonProps}
      {...finalRestProps}
      ref={ref}
      data-active={String(active)}
      data-transition={transition}
    >
      {children}
    </span>
  )
})

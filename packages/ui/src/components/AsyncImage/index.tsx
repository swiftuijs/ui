import { memo, useEffect, useState, type ReactNode, type SyntheticEvent } from 'react'

import type { IBaseElementComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * A view that loads and displays a remote image asynchronously.
 *
 * @see https://developer.apple.com/documentation/swiftui/asyncimage
 */
export interface IAsyncImageProps extends Omit<IBaseElementComponent<'img'>, 'children'> {
  /**
   * Placeholder content shown while the image is loading.
   */
  placeholder?: ReactNode
  /**
   * Fallback content shown when loading fails.
   */
  fallback?: ReactNode
  /**
   * Emits the current async loading phase.
   */
  onPhaseChange?: (phase: 'loading' | 'success' | 'failure') => void
}

export const AsyncImage = memo(function AsyncImage(props: IAsyncImageProps) {
  const {
    placeholder,
    fallback,
    onLoad,
    onError,
    onPhaseChange,
    className,
    src,
    alt,
    ...restProps
  } = props
  const [phase, setPhase] = useState<'loading' | 'success' | 'failure'>('loading')
  const { commonProps, restProps: finalRestProps } = standardizeProps(
    { ...restProps, className },
    {
      className: prefixClass('asyncimage'),
    },
  )

  useEffect(() => {
    setPhase('loading')
  }, [src])

  useEffect(() => {
    onPhaseChange?.(phase)
  }, [onPhaseChange, phase])

  return (
    <div {...commonProps} {...finalRestProps} data-phase={phase}>
      {phase === 'loading' && placeholder ? (
        <div className={prefixClass('asyncimage-placeholder')}>{placeholder}</div>
      ) : null}
      {phase === 'failure' && fallback ? (
        <div className={prefixClass('asyncimage-fallback')}>{fallback}</div>
      ) : null}
      <img
        alt={alt}
        className={prefixClass('asyncimage-image')}
        onError={(event: SyntheticEvent<HTMLImageElement>) => {
          setPhase('failure')
          onError?.(event)
        }}
        onLoad={(event: SyntheticEvent<HTMLImageElement>) => {
          setPhase('success')
          onLoad?.(event)
        }}
        src={src}
        style={{
          display: phase === 'failure' ? 'none' : undefined,
          opacity: phase === 'success' ? 1 : 0,
        }}
      />
    </div>
  )
})

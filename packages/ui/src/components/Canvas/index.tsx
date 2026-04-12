import { memo, useEffect, useRef } from 'react'

import type { IBaseElementComponent } from '@/types'
import { clsx, prefixClass, standardizeProps } from '@/common'

import './style.scss'

/**
 * Canvas provides a thin wrapper around the native canvas element.
 *
 * @see https://developer.apple.com/documentation/swiftui/canvas
 */
export interface ICanvasProps extends Omit<IBaseElementComponent<'canvas'>, 'children'> {
  /**
   * Drawing callback invoked with a 2d rendering context when available.
   */
  draw?: (context: globalThis.CanvasRenderingContext2D) => void
}

export const Canvas = memo(function Canvas(props: ICanvasProps) {
  const { draw, ...restProps } = props
  const canvasRef = useRef<globalThis.HTMLCanvasElement>(null)
  const { commonProps, restProps: finalRestProps } = standardizeProps(restProps, {
    className: prefixClass('canvas'),
  })

  useEffect(() => {
    if (!draw) {
      return
    }
    const context = canvasRef.current?.getContext('2d')
    if (context) {
      draw(context)
    }
  }, [draw])

  return (
    <canvas
      {...commonProps}
      {...finalRestProps}
      className={clsx(prefixClass('canvas'), commonProps.className)}
      ref={canvasRef}
    />
  )
})

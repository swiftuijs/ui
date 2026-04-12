import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Canvas } from '.'

describe('Canvas', () => {
  it('renders a canvas element with explicit dimensions', () => {
    render(<Canvas aria-label="Chart" height={180} width={320} />)

    const canvas = screen.getByLabelText('Chart')

    expect(canvas.tagName).toBe('CANVAS')
    expect(canvas).toHaveAttribute('width', '320')
    expect(canvas).toHaveAttribute('height', '180')
  })

  it('invokes the draw callback when a 2d context is available', () => {
    const draw = vi.fn()
    const context = {} as globalThis.CanvasRenderingContext2D
    const getContext = vi.spyOn(globalThis.HTMLCanvasElement.prototype, 'getContext').mockReturnValue(context)

    render(<Canvas draw={draw} height={120} width={240} />)

    expect(draw).toHaveBeenCalledWith(context)

    getContext.mockRestore()
  })
})

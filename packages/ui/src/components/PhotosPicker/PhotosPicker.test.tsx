import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { PhotosPicker } from '.'

describe('PhotosPicker', () => {
  it('opens an image file input and forwards the selected assets', () => {
    const onSelect = vi.fn()

    render(<PhotosPicker onSelect={onSelect}>Choose photos</PhotosPicker>)

    const input = screen.getByTestId('photos-picker-input')
    expect(input).toHaveAttribute('accept', 'image/*')

    const photo = new globalThis.File(['photo'], 'photo.png', { type: 'image/png' })
    fireEvent.change(input, { target: { files: [photo] } })

    expect(onSelect).toHaveBeenCalledWith([photo])
  })

  it('respects selectionLimit when multiple assets are picked', () => {
    const onSelect = vi.fn()

    render(
      <PhotosPicker onSelect={onSelect} selectionLimit={2}>
        Pick images
      </PhotosPicker>,
    )

    const input = screen.getByTestId('photos-picker-input')
    const files = [
      new globalThis.File(['one'], 'one.png', { type: 'image/png' }),
      new globalThis.File(['two'], 'two.png', { type: 'image/png' }),
      new globalThis.File(['three'], 'three.png', { type: 'image/png' }),
    ]

    fireEvent.change(input, { target: { files } })

    expect(input).toHaveAttribute('multiple')
    expect(onSelect).toHaveBeenCalledWith(files.slice(0, 2))
  })

  it('supports SwiftUI-style matching and max selection props', () => {
    const onSelect = vi.fn()

    render(
      <PhotosPicker matching="videos" maxSelectionCount={3} onSelect={onSelect}>
        Pick media
      </PhotosPicker>,
    )

    const input = screen.getByTestId('photos-picker-input')

    expect(input).toHaveAttribute('accept', 'video/*')
    expect(input).toHaveAttribute('multiple')
  })

  it('resets the hidden input after selection so the same asset can be picked again', () => {
    const onSelect = vi.fn()

    render(<PhotosPicker onSelect={onSelect}>Choose photos</PhotosPicker>)

    const input = screen.getByTestId('photos-picker-input') as HTMLInputElement
    const photo = new globalThis.File(['photo'], 'photo.png', { type: 'image/png' })
    Object.defineProperty(input, 'value', {
      configurable: true,
      writable: true,
      value: 'C:\\fakepath\\photo.png',
    })

    fireEvent.change(input, { target: { files: [photo] } })

    expect(input.value).toBe('')
  })
})

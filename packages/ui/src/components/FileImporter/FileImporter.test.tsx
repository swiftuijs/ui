import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen } from '@/testing/render'

import { FileImporter } from './index'

describe('FileImporter', () => {
  it('forwards selected files to the callback', () => {
    const onSelect = vi.fn()
    render(<FileImporter onSelect={onSelect}>Import file</FileImporter>)

    const input = screen.getByTestId('file-importer-input')
    const file = new globalThis.File(['hello'], 'hello.txt', { type: 'text/plain' })

    fireEvent.change(input, { target: { files: [file] } })

    expect(onSelect).toHaveBeenCalled()
    expect(onSelect.mock.calls[0][0][0]).toBe(file)
  })

  it('supports SwiftUI-style selection props', () => {
    const onSelect = vi.fn()
    render(
      <FileImporter
        allowsMultipleSelection
        allowedContentTypes={['image/png', 'image/jpeg']}
        onSelect={onSelect}
      >
        Import files
      </FileImporter>,
    )

    const input = screen.getByTestId('file-importer-input')

    expect(input).toHaveAttribute('accept', 'image/png,image/jpeg')
    expect(input).toHaveAttribute('multiple')
  })

  it('resets the hidden input value after selection so the same file can be picked again', () => {
    const onSelect = vi.fn()
    render(<FileImporter onSelect={onSelect}>Import file</FileImporter>)

    const input = screen.getByTestId('file-importer-input') as HTMLInputElement
    const file = new globalThis.File(['hello'], 'hello.txt', { type: 'text/plain' })
    Object.defineProperty(input, 'value', {
      configurable: true,
      writable: true,
      value: 'C:\\fakepath\\hello.txt',
    })

    fireEvent.change(input, { target: { files: [file] } })

    expect(input.value).toBe('')
  })
})

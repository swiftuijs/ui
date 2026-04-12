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
})

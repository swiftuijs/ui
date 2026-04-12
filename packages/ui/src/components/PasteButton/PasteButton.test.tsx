import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen, waitFor } from '@/testing/render'

import { PasteButton } from './index'

describe('PasteButton', () => {
  it('reads from the clipboard and forwards pasted text', async () => {
    const onPaste = vi.fn()
    Object.defineProperty(globalThis.navigator, 'clipboard', {
      configurable: true,
      value: {
        readText: vi.fn().mockResolvedValue('Hello from clipboard'),
      },
    })

    render(<PasteButton onPaste={onPaste}>Paste</PasteButton>)

    fireEvent.click(screen.getByRole('button', { name: 'Paste' }))

    await waitFor(() => {
      expect(onPaste).toHaveBeenCalledWith('Hello from clipboard')
    })
  })
})

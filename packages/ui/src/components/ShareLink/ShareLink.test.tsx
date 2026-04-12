import { describe, expect, it, vi } from 'vitest'

import { fireEvent, render, screen, waitFor } from '@/testing/render'

import { ShareLink } from './index'

describe('ShareLink', () => {
  it('uses the Web Share API when available', async () => {
    const share = vi.fn().mockResolvedValue(undefined)
    Object.defineProperty(globalThis.navigator, 'share', {
      configurable: true,
      value: share,
    })

    render(
      <ShareLink
        item="https://swiftuijs.dev/docs"
        subject="SwiftUI.js"
        message="Take a look"
      >
        Share docs
      </ShareLink>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Share docs' }))

    await waitFor(() => {
      expect(share).toHaveBeenCalledWith({
        text: 'Take a look',
        title: 'SwiftUI.js',
        url: 'https://swiftuijs.dev/docs',
      })
    })
  })

  it('falls back to opening the item URL when Web Share is unavailable', () => {
    Object.defineProperty(globalThis.navigator, 'share', {
      configurable: true,
      value: undefined,
    })

    const open = vi.spyOn(window, 'open').mockImplementation(() => null)

    render(<ShareLink item="https://swiftuijs.dev">Share site</ShareLink>)

    fireEvent.click(screen.getByRole('button', { name: 'Share site' }))

    expect(open).toHaveBeenCalledWith('https://swiftuijs.dev', '_blank', 'noopener,noreferrer')

    open.mockRestore()
  })
})

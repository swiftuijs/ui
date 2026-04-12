import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen } from '@/testing/render'

import { AsyncImage } from './index'

describe('AsyncImage', () => {
  it('renders placeholder content until the image loads', () => {
    render(
      <AsyncImage
        src="https://example.com/avatar.png"
        alt="Avatar"
        placeholder={<span>Loading image…</span>}
      />,
    )

    expect(screen.getByText('Loading image…')).toBeInTheDocument()

    fireEvent.load(screen.getByRole('img', { name: 'Avatar' }))

    expect(screen.queryByText('Loading image…')).not.toBeInTheDocument()
  })

  it('renders fallback content when the image fails to load', () => {
    render(
      <AsyncImage
        src="https://example.com/missing.png"
        alt="Missing"
        fallback={<span>Image unavailable</span>}
      />,
    )

    fireEvent.error(screen.getByRole('img', { name: 'Missing' }))

    expect(screen.getByText('Image unavailable')).toBeInTheDocument()
  })
})

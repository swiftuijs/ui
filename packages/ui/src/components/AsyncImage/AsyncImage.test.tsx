import { describe, expect, it, vi } from 'vitest'

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

  it('treats an empty src as an immediate failure state', () => {
    const { container } = render(
      <AsyncImage
        src=""
        alt="Missing"
        fallback={<span>Image unavailable</span>}
      />,
    )

    expect(screen.getByText('Image unavailable')).toBeInTheDocument()
    expect(container.firstElementChild).toHaveAttribute('data-phase', 'failure')
  })

  it('resets back to loading when the src changes after a successful load', () => {
    const { rerender } = render(
      <AsyncImage
        src="https://example.com/avatar.png"
        alt="Avatar"
        placeholder={<span>Loading image…</span>}
      />,
    )

    const image = screen.getByRole('img', { name: 'Avatar' })
    fireEvent.load(image)

    expect(screen.queryByText('Loading image…')).not.toBeInTheDocument()
    expect(image.parentElement).toHaveAttribute('data-phase', 'success')

    rerender(
      <AsyncImage
        src="https://example.com/avatar-2.png"
        alt="Avatar"
        placeholder={<span>Loading image…</span>}
      />,
    )

    expect(screen.getByText('Loading image…')).toBeInTheDocument()
    expect(screen.getByRole('img', { name: 'Avatar' }).parentElement).toHaveAttribute('data-phase', 'loading')
  })

  it('emits phase changes for loading, success, and failure transitions', () => {
    const onPhaseChange = vi.fn()

    const { rerender } = render(
      <AsyncImage
        src="https://example.com/avatar.png"
        alt="Avatar"
        onPhaseChange={onPhaseChange}
      />,
    )

    expect(onPhaseChange).toHaveBeenCalledWith('loading')

    fireEvent.load(screen.getByRole('img', { name: 'Avatar' }))

    expect(onPhaseChange).toHaveBeenLastCalledWith('success')

    rerender(
      <AsyncImage
        src="https://example.com/missing.png"
        alt="Avatar"
        onPhaseChange={onPhaseChange}
      />,
    )

    fireEvent.error(screen.getByRole('img', { name: 'Avatar' }))

    expect(onPhaseChange).toHaveBeenLastCalledWith('failure')
  })

  it('does not emit duplicate phase changes for unrelated rerenders', () => {
    const onPhaseChange = vi.fn()

    const { rerender } = render(
      <AsyncImage
        src="https://example.com/avatar.png"
        alt="Avatar"
        onPhaseChange={onPhaseChange}
      />,
    )

    fireEvent.load(screen.getByRole('img', { name: 'Avatar' }))

    rerender(
      <AsyncImage
        src="https://example.com/avatar.png"
        alt="Avatar"
        onPhaseChange={onPhaseChange}
        title="stable rerender"
      />,
    )

    expect(onPhaseChange.mock.calls).toEqual([['loading'], ['success']])
  })
})

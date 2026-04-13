import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { Map } from '.'

describe('Map', () => {
  it('renders an embedded map iframe for the provided coordinates', () => {
    render(<Map latitude={37.3346} longitude={-122.009} title="Apple Park" zoom={14} />)

    const frame = screen.getByTitle('Apple Park')

    expect(frame.tagName).toBe('IFRAME')
    expect(frame).toHaveAttribute('src')
    expect(frame.getAttribute('src')).toContain('37.3346')
    expect(frame.getAttribute('src')).toContain('-122.009')
  })

  it('renders a fallback link to open the location in a new tab', () => {
    render(<Map latitude={40.7484} longitude={-73.9857} title="Empire State Building" />)

    const link = screen.getByRole('link', { name: 'Open map in new tab' })

    expect(link).toHaveAttribute('target', '_blank')
    expect(link.getAttribute('href')).toContain('40.7484')
    expect(link.getAttribute('href')).toContain('-73.9857')
  })

  it('prefers coordinateRegion bounds when provided', () => {
    render(
      <Map
        coordinateRegion={{
          center: { latitude: 37.3346, longitude: -122.009 },
          span: { latitudeDelta: 0.2, longitudeDelta: 0.3 },
        }}
        latitude={0}
        longitude={0}
        title="Apple Park Region"
      />,
    )

    const frame = screen.getByTitle('Apple Park Region')
    const src = frame.getAttribute('src') ?? ''

    expect(src).toContain('-122.159')
    expect(src).toContain('37.2346')
    expect(src).toContain('-121.859')
    expect(src).toContain('37.4346')
    expect(src).toContain('marker=37.3346%2C-122.009')
  })

  it('supports a custom open label and open callback', () => {
    const handleOpen = vi.fn()

    render(
      <Map
        latitude={37.3346}
        longitude={-122.009}
        onOpen={handleOpen}
        openLabel="Open in Maps"
        title="Apple Park"
      />,
    )

    const link = screen.getByRole('link', { name: 'Open in Maps' })
    fireEvent.click(link)

    expect(handleOpen).toHaveBeenCalledTimes(1)
  })

  it('supports uncontrolled annotation selection and updates the active marker', () => {
    render(
      <Map
        annotations={[
          { id: 'park', title: 'Apple Park', latitude: 37.3346, longitude: -122.009 },
          { id: 'visitor', title: 'Visitor Center', latitude: 37.3327, longitude: -122.0053 },
        ]}
        defaultSelection="visitor"
        latitude={37.3346}
        longitude={-122.009}
        title="Apple Campus"
      />,
    )

    expect(screen.getByRole('button', { name: 'Visitor Center' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('link', { name: 'Open map in new tab' }).getAttribute('href')).toContain('37.3327')
  })

  it('reports controlled annotation selection changes without mutating locally', () => {
    const handleSelectionChange = vi.fn()

    render(
      <Map
        annotations={[
          { id: 'park', title: 'Apple Park', latitude: 37.3346, longitude: -122.009 },
          { id: 'visitor', title: 'Visitor Center', latitude: 37.3327, longitude: -122.0053 },
        ]}
        selection="park"
        onSelectionChange={handleSelectionChange}
        latitude={37.3346}
        longitude={-122.009}
        title="Apple Campus"
      />,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Visitor Center' }))

    expect(handleSelectionChange).toHaveBeenCalledWith('visitor')
    expect(screen.getByRole('button', { name: 'Apple Park' })).toHaveAttribute('aria-pressed', 'true')
  })
})

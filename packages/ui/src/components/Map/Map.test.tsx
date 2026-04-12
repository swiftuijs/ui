import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

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
})

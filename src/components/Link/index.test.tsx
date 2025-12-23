import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Link } from './index'

describe('Link', () => {
  it('should render correctly with string destination', () => {
    render(<Link destination="https://example.com">Visit</Link>)
    const link = screen.getByText('Visit')
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', 'https://example.com')
  })

  it('should render correctly with URL object', () => {
    const url = new URL('https://example.com')
    render(<Link destination={url}>Visit</Link>)
    const link = screen.getByText('Visit')
    expect(link).toHaveAttribute('href', 'https://example.com/')
  })

  it('should apply target attribute', () => {
    render(<Link destination="https://example.com" target="_blank">Visit</Link>)
    const link = screen.getByText('Visit')
    expect(link).toHaveAttribute('target', '_blank')
  })

  it('should apply custom className', () => {
    const { container } = render(<Link destination="https://example.com" className="custom">Link</Link>)
    const link = container.querySelector('a')
    expect(link).toHaveClass('custom')
    expect(link).toHaveClass('sw-link')
  })
})


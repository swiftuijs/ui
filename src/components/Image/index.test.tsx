import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Image } from './index'

describe('Image', () => {
  it('should render correctly', () => {
    render(<Image src="test.jpg" alt="Test image" />)
    const img = screen.getByAltText('Test image')
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute('src', 'test.jpg')
  })

  it('should apply custom className', () => {
    const { container } = render(<Image src="test.jpg" alt="Test" className="custom" />)
    const img = container.querySelector('img')
    expect(img).toHaveClass('custom')
    expect(img).toHaveClass('sw-image')
  })

  it('should apply custom style', () => {
    const { container } = render(<Image src="test.jpg" alt="Test" style={{ width: '100px' }} />)
    const img = container.querySelector('img')
    expect(img).toHaveStyle({ width: '100px' })
  })

  it('should pass through img attributes', () => {
    render(<Image src="test.jpg" alt="Test" width={200} height={100} />)
    const img = screen.getByAltText('Test')
    expect(img).toHaveAttribute('width', '200')
    expect(img).toHaveAttribute('height', '100')
  })
})


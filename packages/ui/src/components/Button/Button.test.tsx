import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Button } from './index'

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<Button className="custom-class">Test</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveClass('custom-class')
    expect(button).toHaveClass('sw-button')
  })

  it('should apply custom style', () => {
    const { container } = render(<Button style={{ color: 'red' }}>Test</Button>)
    const button = container.querySelector('button')
    expect(button).toHaveStyle({ color: 'rgb(255, 0, 0)' })
  })

  it('should handle click events', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    const button = screen.getByText('Click')
    button.click()
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('should be disabled when disabled prop is set', () => {
    render(<Button disabled>Disabled</Button>)
    const button = screen.getByText('Disabled')
    expect(button).toBeDisabled()
  })

  it('should pass through other props', () => {
    render(<Button type="submit" data-testid="test-button">Submit</Button>)
    const button = screen.getByTestId('test-button')
    expect(button).toHaveAttribute('type', 'submit')
  })
})


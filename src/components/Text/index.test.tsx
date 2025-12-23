import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Text } from './index'

describe('Text', () => {
  it('should render correctly', () => {
    render(<Text>Hello World</Text>)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<Text className="custom-class">Test</Text>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('custom-class')
    expect(div).toHaveClass('sw-text')
  })

  it('should apply custom style', () => {
    const { container } = render(<Text style={{ color: 'blue' }}>Test</Text>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveStyle({ color: 'rgb(0, 0, 255)' })
  })

  it('should apply lineLimit when provided', () => {
    const { container } = render(<Text lineLimit={2}>Long text</Text>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('line-clamp')
    expect(div).toHaveStyle({ '--line-limit': '2' })
  })

  it('should not apply line-clamp when lineLimit is not provided', () => {
    const { container } = render(<Text>Normal text</Text>)
    const div = container.firstChild as HTMLElement
    expect(div).not.toHaveClass('line-clamp')
  })

  it('should render children correctly', () => {
    render(
      <Text>
        <span>Nested content</span>
      </Text>
    )
    expect(screen.getByText('Nested content')).toBeInTheDocument()
  })
})


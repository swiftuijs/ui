import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { VStack } from './index'
import { Text } from '../Text'

describe('VStack', () => {
  it('should render correctly', () => {
    render(
      <VStack>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </VStack>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('should apply spacing', () => {
    const { container } = render(
      <VStack spacing={20}>
        <Text>Item</Text>
      </VStack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveStyle({ '--vstack-spacing': '20px' })
  })

  it('should apply alignment', () => {
    const { container } = render(
      <VStack alignment="leading">
        <Text>Item</Text>
      </VStack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveAttribute('data-alignment', 'leading')
  })

  it('should apply custom className', () => {
    const { container } = render(<VStack className="custom">Content</VStack>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('custom')
    expect(div).toHaveClass('sw-vstack')
  })

  it('should apply custom style', () => {
    const { container } = render(<VStack style={{ padding: '10px' }}>Content</VStack>)
    const div = container.firstChild as HTMLElement
    expect(div.style.padding).toBe('10px')
  })
})


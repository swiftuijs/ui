import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ZStack } from './index'
import { Text } from '../Text'

describe('ZStack', () => {
  it('should render correctly', () => {
    render(
      <ZStack>
        <Text>Layer 1</Text>
        <Text>Layer 2</Text>
      </ZStack>
    )
    expect(screen.getByText('Layer 1')).toBeInTheDocument()
    expect(screen.getByText('Layer 2')).toBeInTheDocument()
  })

  it('should apply alignment', () => {
    const { container } = render(
      <ZStack alignment="center">
        <Text>Content</Text>
      </ZStack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveAttribute('data-alignment', 'center')
  })

  it('should apply custom className', () => {
    const { container } = render(<ZStack className="custom">Content</ZStack>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('custom')
    expect(div).toHaveClass('sw-zstack')
  })
})


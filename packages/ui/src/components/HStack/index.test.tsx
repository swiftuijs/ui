import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { HStack } from './index'
import { Text } from '../Text'

describe('HStack', () => {
  it('should render correctly', () => {
    render(
      <HStack>
        <Text>Left</Text>
        <Text>Right</Text>
      </HStack>
    )
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })

  it('should apply default center alignment', () => {
    const { container } = render(
      <HStack>
        <Text>Item</Text>
      </HStack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('align-center')
  })

  it('should apply custom alignment', () => {
    const { container } = render(
      <HStack alignment="leading">
        <Text>Item</Text>
      </HStack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('align-leading')
  })

  it('should apply spacing', () => {
    const { container } = render(
      <HStack spacing={15}>
        <Text>Item</Text>
      </HStack>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveStyle({ '--hstack-spacing': '15px' })
  })
})


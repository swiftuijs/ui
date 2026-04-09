import { describe, it, expect } from 'vitest'
import { render, screen } from '@/testing/render'
import { HStack } from './index'
import { Text } from '../Text'

describe('HStack', () => {
  describe('primitive checklist', () => {
    it('renders a semantic container with text output', () => {
      const { container } = render(
        <HStack>
          <Text>Left</Text>
          <Text>Right</Text>
        </HStack>
      )

      expect(screen.getByText('Left')).toBeInTheDocument()
      expect(screen.getByText('Right')).toBeInTheDocument()
      expect(container.firstElementChild?.tagName).toBe('DIV')
    })

    it('composes user className and style with explicit alignment data', () => {
      const { container } = render(
        <HStack
          alignment="leading"
          className="custom-stack"
          style={{ padding: '10px' }}
        >
          <Text>Item</Text>
        </HStack>
      )

      const stack = container.firstElementChild as HTMLElement

      expect(stack).toHaveClass('sw-hstack', 'sw-container', 'custom-stack')
      expect(stack).toHaveStyle({ padding: '10px' })
      expect(stack).toHaveAttribute('data-alignment', 'leading')
    })

    it('uses an explicit default alignment and token-aware spacing values', () => {
      const { container, rerender } = render(
        <HStack spacing="lg">
          <Text>Token spacing</Text>
        </HStack>
      )

      let stack = container.firstElementChild as HTMLElement

      expect(stack).toHaveAttribute('data-alignment', 'center')
      expect(stack).toHaveStyle({ '--stack-spacing': 'var(--sw-spacing-lg)' })

      rerender(
        <HStack spacing={24}>
          <Text>Token spacing</Text>
        </HStack>
      )

      stack = container.firstElementChild as HTMLElement

      expect(stack).toHaveStyle({ '--stack-spacing': '24px' })
    })
  })
})

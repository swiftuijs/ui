import { describe, it, expect } from 'vitest'
import { render, screen } from '@/testing/render'
import { VStack } from './index'
import { Text } from '../Text'

describe('VStack', () => {
  describe('primitive checklist', () => {
    it('renders a semantic container with text output', () => {
      const { container } = render(
        <VStack>
          <Text>Item 1</Text>
          <Text>Item 2</Text>
        </VStack>
      )

      expect(screen.getByText('Item 1')).toBeInTheDocument()
      expect(screen.getByText('Item 2')).toBeInTheDocument()
      expect(container.firstElementChild?.tagName).toBe('DIV')
    })

    it('composes user className and style with explicit alignment data', () => {
      const { container } = render(
        <VStack
          alignment="leading"
          className="custom-stack"
          style={{ padding: '10px' }}
        >
          <Text>Content</Text>
        </VStack>
      )

      const stack = container.firstElementChild as HTMLElement

      expect(stack).toHaveClass('sw-vstack', 'sw-container', 'custom-stack')
      expect(stack).toHaveStyle({ padding: '10px' })
      expect(stack).toHaveAttribute('data-alignment', 'leading')
    })

    it('keeps default alignment implicit until the caller opts in', () => {
      const { container } = render(
        <VStack>
          <Text>Default alignment</Text>
        </VStack>
      )

      const stack = container.firstElementChild as HTMLElement

      expect(stack).not.toHaveAttribute('data-alignment')
    })

    it('generates straightforward token-aware spacing variables', () => {
      const { container, rerender } = render(
        <VStack spacing="md">
          <Text>Spacing</Text>
        </VStack>
      )

      let stack = container.firstElementChild as HTMLElement

      expect(stack).toHaveStyle({ '--stack-spacing': 'var(--sw-spacing-md)' })

      rerender(
        <VStack spacing={20}>
          <Text>Spacing</Text>
        </VStack>
      )

      stack = container.firstElementChild as HTMLElement

      expect(stack).toHaveStyle({ '--stack-spacing': '20px' })
    })
  })
})

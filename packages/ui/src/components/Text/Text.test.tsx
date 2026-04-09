import { describe, it, expect } from 'vitest'
import { render, screen } from '@/testing/render'
import { Text } from './index'

describe('Text', () => {
  describe('primitive checklist', () => {
    it('renders semantic text output', () => {
      render(<Text>Hello World</Text>)

      const text = screen.getByText('Hello World')

      expect(text.tagName).toBe('SPAN')
    })

    it('composes user className and style', () => {
      render(
        <Text className="custom-class" style={{ color: 'blue' }}>
          Styled text
        </Text>
      )

      const text = screen.getByText('Styled text')

      expect(text).toHaveClass('sw-text', 'custom-class')
      expect(text).toHaveStyle({ color: 'rgb(0, 0, 255)' })
    })

    it('exposes line clamping as user-observable output', () => {
      render(<Text lineLimit={2}>Clamped copy</Text>)

      const text = screen.getByText('Clamped copy')

      expect(text).toHaveClass('line-clamp')
      expect(text).toHaveStyle({ '--line-limit': '2' })
    })

    it('keeps line clamping disabled for omitted or zero limits', () => {
      render(
        <>
          <Text>No clamp</Text>
          <Text lineLimit={0}>Zero clamp</Text>
        </>
      )

      const unclampedText = screen.getByText('No clamp')
      const zeroLimitText = screen.getByText('Zero clamp')

      expect(unclampedText).not.toHaveClass('line-clamp')
      expect(zeroLimitText).not.toHaveClass('line-clamp')
      expect(zeroLimitText.style.getPropertyValue('--line-limit')).toBe('')
    })
  })
})

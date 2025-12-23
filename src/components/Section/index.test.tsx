import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Section } from './index'
import { Text } from '../Text'

describe('Section', () => {
  it('should render correctly', () => {
    render(<Section>Content</Section>)
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should render header when provided', () => {
    render(
      <Section header={<Text>Header</Text>}>
        Content
      </Section>
    )
    expect(screen.getByText('Header')).toBeInTheDocument()
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should not render header when not provided', () => {
    const { container } = render(<Section>Content</Section>)
    const header = container.querySelector('.sw-section-header')
    expect(header).toBeNull()
  })

  it('should apply custom className', () => {
    const { container } = render(<Section className="custom">Content</Section>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('custom')
    expect(div).toHaveClass('sw-section')
  })
})


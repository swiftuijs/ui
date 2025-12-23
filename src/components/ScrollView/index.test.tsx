import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ScrollView } from './index'
import { Text } from '../Text'

describe('ScrollView', () => {
  it('should render correctly', () => {
    render(
      <ScrollView>
        <Text>Content</Text>
      </ScrollView>
    )
    expect(screen.getByText('Content')).toBeInTheDocument()
  })

  it('should default to vertical direction', () => {
    const { container } = render(<ScrollView><Text>Content</Text></ScrollView>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('vertical')
  })

  it('should apply horizontal direction', () => {
    const { container } = render(<ScrollView direction="horizontal"><Text>Content</Text></ScrollView>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('horizontal')
  })

  it('should hide indicators when showsIndicators is false', () => {
    const { container } = render(<ScrollView showsIndicators={false}><Text>Content</Text></ScrollView>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('no-scroll-bar')
  })

  it('should show indicators by default', () => {
    const { container } = render(<ScrollView><Text>Content</Text></ScrollView>)
    const div = container.firstChild as HTMLElement
    expect(div).not.toHaveClass('no-scroll-bar')
  })
})


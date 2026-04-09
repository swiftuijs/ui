import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { List } from './index'
import { Text } from '../Text'

describe('List', () => {
  it('should render correctly', () => {
    render(
      <List>
        <Text>Item 1</Text>
        <Text>Item 2</Text>
      </List>
    )
    expect(screen.getByText('Item 1')).toBeInTheDocument()
    expect(screen.getByText('Item 2')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(<List className="custom">Content</List>)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('custom')
    expect(div).toHaveClass('sw-list')
  })
})


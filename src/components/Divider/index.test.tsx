import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Divider } from './index'
import { LayoutContext } from 'src/contexts'

describe('Divider', () => {
  it('should render correctly', () => {
    const { container } = render(<Divider />)
    const div = container.firstChild as HTMLElement
    expect(div).toBeInTheDocument()
  })

  it('should apply className based on layout context', () => {
    const { container } = render(
      <LayoutContext.Provider value={{ boxDirection: 'row' }}>
        <Divider />
      </LayoutContext.Provider>
    )
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('sw-divider')
    expect(div.className).toContain('row')
  })

  it('should apply custom className', () => {
    const { container } = render(<Divider className="custom" />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('custom')
  })
})


import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import { Spacer } from './index'

describe('Spacer', () => {
  it('should render correctly', () => {
    const { container } = render(<Spacer />)
    const div = container.firstChild as HTMLElement
    expect(div).toBeInTheDocument()
    expect(div).toHaveClass('sw-spacer')
  })

  it('should apply minLength as number', () => {
    const { container } = render(<Spacer minLength={50} />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveStyle({ '--min-length': '50px' })
  })

  it('should apply minLength as string', () => {
    const { container } = render(<Spacer minLength="2rem" />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveStyle({ '--min-length': '2rem' })
  })

  it('should apply custom className', () => {
    const { container } = render(<Spacer className="custom" />)
    const div = container.firstChild as HTMLElement
    expect(div).toHaveClass('custom')
  })
})


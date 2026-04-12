import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ScrollView } from './index'
import { Text } from '../Text'
import { ScrollTarget } from '../ScrollTarget'

afterEach(() => {
  vi.useRealTimers()
})

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

  it('should report scroll position changes', () => {
    const onScrollPositionChange = vi.fn()
    const { container } = render(
      <ScrollView onScrollPositionChange={onScrollPositionChange}>
        <div style={{ height: 1000 }}>Content</div>
      </ScrollView>,
    )

    const div = container.firstChild as HTMLDivElement
    Object.defineProperty(div, 'scrollTop', { value: 120, configurable: true })
    Object.defineProperty(div, 'scrollLeft', { value: 24, configurable: true })

    fireEvent.scroll(div)

    expect(onScrollPositionChange).toHaveBeenCalledWith({ x: 24, y: 120, target: null })
  })

  it('should scroll to a target when the controlled position target changes', () => {
    const scrollIntoView = vi.fn()
    const { container, rerender } = render(
      <ScrollView>
        <ScrollTarget scrollId="details">
          <div>Details</div>
        </ScrollTarget>
      </ScrollView>,
    )

    const target = container.querySelector('[data-sw-scroll-id="details"]') as HTMLElement
    target.scrollIntoView = scrollIntoView

    rerender(
      <ScrollView scrollPosition={{ target: 'details' }}>
        <ScrollTarget scrollId="details">
          <div>Details</div>
        </ScrollTarget>
      </ScrollView>,
    )

    expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth', block: 'nearest', inline: 'nearest' })
  })

  it('should emit scroll phase changes while scrolling', () => {
    vi.useFakeTimers()
    const onScrollPhaseChange = vi.fn()
    const { container } = render(
      <ScrollView onScrollPhaseChange={onScrollPhaseChange}>
        <div style={{ height: 1000 }}>Content</div>
      </ScrollView>,
    )

    const div = container.firstChild as HTMLDivElement
    fireEvent.scroll(div)

    expect(onScrollPhaseChange).toHaveBeenCalledWith('scrolling')

    vi.advanceTimersByTime(180)

    expect(onScrollPhaseChange).toHaveBeenLastCalledWith('idle')
  })
})

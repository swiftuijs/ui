import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

import { Inspector } from './index'

describe('Inspector', () => {
  it('renders primary content and inspector content when presented', () => {
    render(
      <Inspector
        content={<div>Inspector content</div>}
        isPresented
        title="Details"
      >
        <div>Main content</div>
      </Inspector>,
    )

    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.getByRole('complementary', { name: 'Details' })).toBeInTheDocument()
    expect(screen.getByText('Inspector content')).toBeInTheDocument()
  })

  it('does not render the inspector panel when not presented', () => {
    render(
      <Inspector
        content={<div>Inspector content</div>}
        isPresented={false}
        title="Details"
      >
        <div>Main content</div>
      </Inspector>,
    )

    expect(screen.getByText('Main content')).toBeInTheDocument()
    expect(screen.queryByRole('complementary', { name: 'Details' })).not.toBeInTheDocument()
  })

  it('emits onOpenChange when the dismiss button is clicked', () => {
    const onOpenChange = vi.fn()

    render(
      <Inspector
        content={<div>Inspector content</div>}
        isPresented
        onOpenChange={onOpenChange}
        title="Details"
      >
        <div>Main content</div>
      </Inspector>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Hide inspector' }))

    expect(onOpenChange).toHaveBeenCalledWith(false)
  })

  it('marks leading placement in the DOM', () => {
    render(
      <Inspector
        content={<div>Inspector content</div>}
        isPresented
        placement="leading"
        title="Details"
      >
        <div>Main content</div>
      </Inspector>,
    )

    expect(screen.getByTestId('inspector-root')).toHaveAttribute('data-placement', 'leading')
  })
})

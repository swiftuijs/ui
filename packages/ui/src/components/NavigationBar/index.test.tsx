import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NavigationBar } from './index'
import { Button } from '../Button'

describe('NavigationBar', () => {
  it('should render correctly', () => {
    render(<NavigationBar title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('should render title when provided', () => {
    render(<NavigationBar title="My Page" />)
    expect(screen.getByText('My Page')).toBeInTheDocument()
  })

  it('should not render title when not provided', () => {
    const { container } = render(<NavigationBar />)
    expect(container).not.toHaveTextContent(/\S/)
  })

  it('should show back button when showBackButton is true', () => {
    render(<NavigationBar title="Test" showBackButton={true} />)
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
  })

  it('should not show back button when showBackButton is false', () => {
    render(<NavigationBar title="Test" showBackButton={false} />)
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument()
  })

  it('should not show back button by default', () => {
    render(<NavigationBar title="Test" />)
    expect(screen.queryByRole('button', { name: /back/i })).not.toBeInTheDocument()
  })

  it('should call onBack when back button is clicked', () => {
    const handleBack = vi.fn()
    render(<NavigationBar title="Test" showBackButton={true} onBack={handleBack} />)
    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(handleBack).toHaveBeenCalledTimes(1)
  })

  it('should render toolbar items when provided', () => {
    render(
      <NavigationBar 
        title="Test" 
        toolbarItems={<Button data-testid="toolbar-button">Share</Button>} 
      />
    )
    expect(screen.getByTestId('toolbar-button')).toBeInTheDocument()
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('should not render toolbar items when not provided', () => {
    render(<NavigationBar title="Test" />)
    expect(screen.queryByRole('button', { name: /share/i })).not.toBeInTheDocument()
  })

  it('should render all elements together', () => {
    const handleBack = vi.fn()
    render(
      <NavigationBar 
        title="Product Details"
        showBackButton={true}
        onBack={handleBack}
        toolbarItems={<Button>Share</Button>}
      />
    )
    
    expect(screen.getByText('Product Details')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /share/i })).toBeInTheDocument()
  })

  it('should handle empty title string', () => {
    const { container } = render(<NavigationBar title="" />)
    expect(container).not.toHaveTextContent(/\S/)
  })
})

import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
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
    const titleElement = container.querySelector('.sw-text')
    // Title should not be rendered when not provided
    expect(titleElement).not.toBeInTheDocument()
  })

  it('should show back button when showBackButton is true', () => {
    render(<NavigationBar title="Test" showBackButton={true} />)
    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('should not show back button when showBackButton is false', () => {
    render(<NavigationBar title="Test" showBackButton={false} />)
    expect(screen.queryByText('Back')).not.toBeInTheDocument()
  })

  it('should not show back button by default', () => {
    render(<NavigationBar title="Test" />)
    expect(screen.queryByText('Back')).not.toBeInTheDocument()
  })

  it('should call onBack when back button is clicked', () => {
    const handleBack = vi.fn()
    render(<NavigationBar title="Test" showBackButton={true} onBack={handleBack} />)
    const backButton = screen.getByText('Back')
    backButton.click()
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
    const { container } = render(<NavigationBar title="Test" />)
    const toolbar = container.querySelector('.sw-navigation-bar-toolbar')
    expect(toolbar).not.toBeInTheDocument()
  })

  it('should apply correct className', () => {
    const { container } = render(<NavigationBar title="Test" />)
    const navBar = container.firstChild as HTMLElement
    expect(navBar).toHaveClass('sw-navigation-bar')
  })

  it('should render back button with correct className', () => {
    const { container } = render(<NavigationBar title="Test" showBackButton={true} />)
    const backButton = container.querySelector('.sw-navigation-bar-back')
    expect(backButton).toBeInTheDocument()
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
    expect(screen.getByText('Back')).toBeInTheDocument()
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('should handle empty title string', () => {
    const { container } = render(<NavigationBar title="" />)
    const titleElement = container.querySelector('.sw-text')
    // Empty string should not render title
    expect(titleElement).not.toBeInTheDocument()
  })
})


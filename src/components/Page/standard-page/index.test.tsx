import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StandardPage } from './index'
import { NaviContext } from 'src/contexts'
import { Text } from 'src/components/Text'
import { Button } from 'src/components/Button'

describe('StandardPage', () => {
  const mockNaviContext = {
    eventPrefix: 'test-prefix',
    append: vi.fn(),
    removeLast: vi.fn(),
    count: vi.fn(() => 0),
    dismiss: vi.fn(),
  }

  const renderWithContext = (component: React.ReactElement, contextValue = mockNaviContext) => {
    return render(
      <NaviContext.Provider value={contextValue}>
        {component}
      </NaviContext.Provider>
    )
  }

  it('should render correctly', () => {
    renderWithContext(
      <StandardPage id="test-page">
        <Text>Page Content</Text>
      </StandardPage>
    )
    expect(screen.getByText('Page Content')).toBeInTheDocument()
  })

  it('should render navigation bar when navigationTitle is provided', () => {
    renderWithContext(
      <StandardPage id="test-page" navigationTitle="Home">
        <Text>Content</Text>
      </StandardPage>
    )
    expect(screen.getByText('Home')).toBeInTheDocument()
  })

  it('should not render navigation bar when navigationTitle is not provided', () => {
    const { container } = renderWithContext(
      <StandardPage id="test-page">
        <Text>Content</Text>
      </StandardPage>
    )
    const navBar = container.querySelector('.sw-navigation-bar')
    expect(navBar).not.toBeInTheDocument()
  })

  it('should show back button when page count is greater than 0', () => {
    const contextWithPages = {
      ...mockNaviContext,
      count: vi.fn(() => 1),
    }
    renderWithContext(
      <StandardPage id="test-page" navigationTitle="Details">
        <Text>Content</Text>
      </StandardPage>,
      contextWithPages
    )
    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('should not show back button when page count is 0', () => {
    renderWithContext(
      <StandardPage id="test-page" navigationTitle="Home">
        <Text>Content</Text>
      </StandardPage>
    )
    expect(screen.queryByText('Back')).not.toBeInTheDocument()
  })

  it('should call dismiss when back button is clicked', () => {
    const dismissMock = vi.fn()
    const contextWithPages = {
      ...mockNaviContext,
      count: vi.fn(() => 1),
      dismiss: dismissMock,
    }
    renderWithContext(
      <StandardPage id="test-page" navigationTitle="Details">
        <Text>Content</Text>
      </StandardPage>,
      contextWithPages
    )
    const backButton = screen.getByText('Back')
    backButton.click()
    expect(dismissMock).toHaveBeenCalledTimes(1)
  })

  it('should render toolbar items when provided', () => {
    renderWithContext(
      <StandardPage 
        id="test-page" 
        navigationTitle="Details"
        toolbarItems={<Button data-testid="share-btn">Share</Button>}
      >
        <Text>Content</Text>
      </StandardPage>
    )
    expect(screen.getByTestId('share-btn')).toBeInTheDocument()
    expect(screen.getByText('Share')).toBeInTheDocument()
  })

  it('should apply correct className', () => {
    const { container } = renderWithContext(
      <StandardPage id="test-page">
        <Text>Content</Text>
      </StandardPage>
    )
    const page = container.firstChild as HTMLElement
    expect(page).toHaveClass('sw-page')
  })

  it('should apply page-content className when navigation bar is present', () => {
    const { container } = renderWithContext(
      <StandardPage id="test-page" navigationTitle="Home">
        <Text>Content</Text>
      </StandardPage>
    )
    const content = container.querySelector('.sw-page-content')
    expect(content).toBeInTheDocument()
  })

  it('should not apply page-content className when navigation bar is not present', () => {
    const { container } = renderWithContext(
      <StandardPage id="test-page">
        <Text>Content</Text>
      </StandardPage>
    )
    const content = container.querySelector('.sw-page-content')
    expect(content).not.toBeInTheDocument()
  })

  it('should pass through id prop', () => {
    const { container } = renderWithContext(
      <StandardPage id="custom-page-id">
        <Text>Content</Text>
      </StandardPage>
    )
    const page = container.firstChild as HTMLElement
    expect(page).toHaveAttribute('id', 'custom-page-id')
  })

  it('should render children correctly', () => {
    renderWithContext(
      <StandardPage id="test-page">
        <Text>First</Text>
        <Text>Second</Text>
      </StandardPage>
    )
    expect(screen.getByText('First')).toBeInTheDocument()
    expect(screen.getByText('Second')).toBeInTheDocument()
  })

  it('should handle empty navigationTitle', () => {
    const { container } = renderWithContext(
      <StandardPage id="test-page" navigationTitle="">
        <Text>Content</Text>
      </StandardPage>
    )
    const navBar = container.querySelector('.sw-navigation-bar')
    // Empty string should not render navigation bar
    expect(navBar).not.toBeInTheDocument()
  })
})


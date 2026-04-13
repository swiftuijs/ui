import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { TabView } from './index'

const items = [
  { label: 'Home', value: 'home', content: <div>Home panel</div> },
  { label: 'Search', value: 'search', content: <div>Search panel</div> },
  { label: 'Profile', value: 'profile', content: <div>Profile panel</div> },
]

describe('TabView', () => {
  describe('primitive checklist', () => {
    it('renders tab semantics and shows the selected panel', () => {
      render(
        <TabView
          aria-label="Main tabs"
          items={items}
          selection="search"
        />
      )

      const tablist = screen.getByRole('tablist', { name: 'Main tabs' })
      const homeTab = screen.getByRole('tab', { name: 'Home' })
      const searchTab = screen.getByRole('tab', { name: 'Search' })

      expect(tablist).toBeInTheDocument()
      expect(homeTab).toHaveAttribute('aria-selected', 'false')
      expect(searchTab).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Search panel')
    })

    it('updates uncontrolled selection when a tab is clicked', async () => {
      const user = userEvent.setup()

      render(
        <TabView
          aria-label="Main tabs"
          items={items}
          defaultSelection="home"
        />
      )

      await user.click(screen.getByRole('tab', { name: 'Profile' }))

      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile panel')
    })

    it('calls onSelectionChange in controlled mode without mutating local state', async () => {
      const user = userEvent.setup()
      const handleSelectionChange = vi.fn()

      render(
        <TabView
          aria-label="Main tabs"
          items={items}
          selection="home"
          onSelectionChange={handleSelectionChange}
        />
      )

      await user.click(screen.getByRole('tab', { name: 'Search' }))

      expect(handleSelectionChange).toHaveBeenCalledWith('search')
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Home panel')
    })

    it('does not emit onSelectionChange when the currently selected tab is clicked again', async () => {
      const user = userEvent.setup()
      const handleSelectionChange = vi.fn()

      render(
        <TabView
          aria-label="Main tabs"
          items={items}
          defaultSelection="home"
          onSelectionChange={handleSelectionChange}
        />
      )

      await user.click(screen.getByRole('tab', { name: 'Home' }))

      expect(handleSelectionChange).not.toHaveBeenCalled()
      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true')
    })

    it('supports arrow-key navigation between tabs', async () => {
      const user = userEvent.setup()

      render(
        <TabView
          aria-label="Main tabs"
          items={items}
          defaultSelection="home"
        />
      )

      const homeTab = screen.getByRole('tab', { name: 'Home' })

      homeTab.focus()
      await user.keyboard('{ArrowRight}')

      expect(screen.getByRole('tab', { name: 'Search' })).toHaveFocus()
      expect(screen.getByRole('tab', { name: 'Search' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Search panel')
    })

    it('skips disabled tabs for click and keyboard selection', async () => {
      const user = userEvent.setup()

      render(
        <TabView
          aria-label="Main tabs"
          items={[
            items[0],
            { ...items[1], disabled: true },
            items[2],
          ]}
          defaultSelection="home"
        />
      )

      const disabledTab = screen.getByRole('tab', { name: 'Search' })
      const homeTab = screen.getByRole('tab', { name: 'Home' })

      expect(disabledTab).toBeDisabled()

      await user.click(disabledTab)
      expect(homeTab).toHaveAttribute('aria-selected', 'true')

      homeTab.focus()
      await user.keyboard('{ArrowRight}')

      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveFocus()
      expect(screen.getByRole('tab', { name: 'Profile' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Profile panel')
    })

    it('falls back to the next enabled tab when the current controlled selection disappears', () => {
      const { rerender } = render(
        <TabView
          aria-label="Main tabs"
          items={items}
          selection="search"
        />
      )

      rerender(
        <TabView
          aria-label="Main tabs"
          items={[items[0], items[2]]}
          selection="search"
        />
      )

      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Home panel')
    })

    it('renders tab badges as part of the tab affordance', () => {
      render(
        <TabView
          aria-label="Main tabs"
          items={[
            { ...items[0], badge: 'New' },
            { ...items[1], badge: 3 },
            items[2],
          ]}
          defaultSelection="home"
        />
      )

      expect(screen.getByRole('tab', { name: /Home/i })).toHaveTextContent('New')
      expect(screen.getByRole('tab', { name: /Search/i })).toHaveTextContent('3')
    })

    it('falls back to the first enabled tab when a controlled selection points to a disabled tab', () => {
      render(
        <TabView
          aria-label="Main tabs"
          items={[
            items[0],
            { ...items[1], disabled: true },
            items[2],
          ]}
          selection="search"
        />
      )

      expect(screen.getByRole('tab', { name: 'Home' })).toHaveAttribute('aria-selected', 'true')
      expect(screen.getByRole('tabpanel')).toHaveTextContent('Home panel')
    })
  })
})

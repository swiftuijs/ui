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
  })
})

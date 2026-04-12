import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { NavigationSplitView } from './index'

describe('NavigationSplitView', () => {
  it('renders sidebar and detail regions in regular layouts', () => {
    render(
      <NavigationSplitView
        sidebar={<div>Sidebar</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Detail')
  })

  it('renders content between sidebar and detail when provided', () => {
    render(
      <NavigationSplitView
        sidebar={<div>Sidebar</div>}
        content={<div>Content</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(screen.getByRole('region', { name: 'Content' })).toBeInTheDocument()
  })

  it('collapses to the detail column in compact mode by default', () => {
    render(
      <NavigationSplitView
        compact
        sidebar={<div>Sidebar</div>}
        content={<div>Content</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(screen.queryByText('Sidebar')).not.toBeInTheDocument()
    expect(screen.queryByText('Content')).not.toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Detail')
  })
})

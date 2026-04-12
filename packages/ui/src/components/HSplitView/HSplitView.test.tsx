import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { HSplitView } from './index'

describe('HSplitView', () => {
  it('renders panes in a horizontal split layout with equal sizing by default', () => {
    render(
      <HSplitView>
        <div>Sidebar</div>
        <div>Content</div>
      </HSplitView>,
    )

    const splitView = screen.getByTestId('hsplitview')
    const panes = screen.getAllByTestId('splitview-pane')

    expect(splitView).toHaveAttribute('data-orientation', 'horizontal')
    expect(panes).toHaveLength(2)
    expect(panes[0]).toHaveStyle({ flexGrow: '1' })
    expect(panes[1]).toHaveStyle({ flexGrow: '1' })
  })

  it('applies provided fractions to pane sizing', () => {
    render(
      <HSplitView fractions={[1, 3]}>
        <div>Primary</div>
        <div>Detail</div>
      </HSplitView>,
    )

    const panes = screen.getAllByTestId('splitview-pane')

    expect(panes[0]).toHaveStyle({ flexGrow: '1' })
    expect(panes[1]).toHaveStyle({ flexGrow: '3' })
  })
})

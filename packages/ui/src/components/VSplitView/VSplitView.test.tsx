import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { VSplitView } from './index'

describe('VSplitView', () => {
  it('renders panes in a vertical split layout', () => {
    render(
      <VSplitView>
        <div>Top</div>
        <div>Bottom</div>
      </VSplitView>,
    )

    const splitView = screen.getByTestId('vsplitview')
    const panes = screen.getAllByTestId('splitview-pane')

    expect(splitView).toHaveAttribute('data-orientation', 'vertical')
    expect(panes).toHaveLength(2)
  })

  it('renders dividers between panes when enabled', () => {
    render(
      <VSplitView>
        <div>First</div>
        <div>Second</div>
        <div>Third</div>
      </VSplitView>,
    )

    expect(screen.getAllByTestId('splitview-divider')).toHaveLength(2)
  })
})

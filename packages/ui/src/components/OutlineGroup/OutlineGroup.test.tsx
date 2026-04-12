import { describe, expect, it } from 'vitest'

import { fireEvent, render, screen, within } from '@/testing/render'

import { OutlineGroup } from './index'

type Node = {
  id: string
  title: string
  children?: Node[]
}

const tree: Node[] = [
  {
    id: 'design',
    title: 'Design',
    children: [
      { id: 'assets', title: 'Assets' },
    ],
  },
]

describe('OutlineGroup', () => {
  it('renders expandable tree items', () => {
    render(
      <OutlineGroup
        data={tree}
        getChildren={(item) => item.children}
        getKey={(item) => item.id}
        renderItem={(item) => item.title}
      />,
    )

    const treeView = screen.getByRole('tree')
    const parent = within(treeView).getByRole('treeitem', { name: 'Design' })

    expect(parent).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByRole('treeitem', { name: 'Assets' })).not.toBeInTheDocument()

    fireEvent.click(within(parent).getByRole('button', { name: 'Design' }))

    expect(parent).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('treeitem', { name: 'Assets' })).toBeInTheDocument()
  })
})

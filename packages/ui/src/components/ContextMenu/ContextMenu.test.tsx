import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { render, screen } from '@/testing/render'

import { ContextMenu } from './index'

const items = [
  { label: 'Rename', action: vi.fn() },
  { label: 'Delete', action: vi.fn(), style: 'destructive' as const },
]

describe('ContextMenu', () => {
  it('opens from a contextmenu interaction and exposes menu semantics', async () => {
    const user = userEvent.setup()

    render(
      <ContextMenu items={items}>
        <div>File.txt</div>
      </ContextMenu>,
    )

    await user.pointer([
      {
        target: screen.getByText('File.txt'),
        keys: '[MouseRight]',
      },
    ])

    const menu = screen.getByRole('menu')

    expect(menu).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Rename' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
  })

  it('invokes actions and closes after selection', async () => {
    const user = userEvent.setup()
    const rename = vi.fn()

    render(
      <ContextMenu items={[{ label: 'Rename', action: rename }]}>
        <div>File.txt</div>
      </ContextMenu>,
    )

    await user.pointer([
      {
        target: screen.getByText('File.txt'),
        keys: '[MouseRight]',
      },
    ])

    await user.click(screen.getByRole('menuitem', { name: 'Rename' }))

    expect(rename).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('dismisses on outside click and Escape', async () => {
    const user = userEvent.setup()

    render(
      <ContextMenu items={items}>
        <div>File.txt</div>
      </ContextMenu>,
    )

    await user.pointer([
      {
        target: screen.getByText('File.txt'),
        keys: '[MouseRight]',
      },
    ])

    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(document.body)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()

    await user.pointer([
      {
        target: screen.getByText('File.txt'),
        keys: '[MouseRight]',
      },
    ])

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})

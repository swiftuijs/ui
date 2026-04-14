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

  it('focuses the first enabled item when opened and restores focus to the trigger on dismiss', async () => {
    const user = userEvent.setup()

    render(
      <ContextMenu
        items={[
          { label: 'Disabled', disabled: true },
          { label: 'Rename', action: vi.fn() },
          { label: 'Delete', action: vi.fn(), style: 'destructive' },
        ]}
      >
        <button type="button">File.txt</button>
      </ContextMenu>,
    )

    const trigger = screen.getByRole('button', { name: 'File.txt' })

    trigger.focus()
    await user.pointer([
      {
        target: trigger,
        keys: '[MouseRight]',
      },
    ])

    expect(screen.getByRole('menuitem', { name: 'Rename' })).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(trigger).toHaveFocus()
  })

  it('supports arrow, home, and end keyboard navigation between enabled items', async () => {
    const user = userEvent.setup()

    render(
      <ContextMenu
        items={[
          { label: 'Disabled', disabled: true },
          { label: 'Rename', action: vi.fn() },
          { label: 'Duplicate', action: vi.fn() },
          { label: 'Delete', action: vi.fn(), style: 'destructive' },
        ]}
      >
        <button type="button">File.txt</button>
      </ContextMenu>,
    )

    await user.pointer([
      {
        target: screen.getByRole('button', { name: 'File.txt' }),
        keys: '[MouseRight]',
      },
    ])

    const rename = screen.getByRole('menuitem', { name: 'Rename' })
    const duplicate = screen.getByRole('menuitem', { name: 'Duplicate' })
    const deleteAction = screen.getByRole('menuitem', { name: 'Delete' })

    expect(rename).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(duplicate).toHaveFocus()

    await user.keyboard('{End}')
    expect(deleteAction).toHaveFocus()

    await user.keyboard('{ArrowDown}')
    expect(rename).toHaveFocus()

    await user.keyboard('{Home}')
    expect(rename).toHaveFocus()

    await user.keyboard('{ArrowUp}')
    expect(deleteAction).toHaveFocus()
  })
})

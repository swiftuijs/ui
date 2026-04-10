import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { Button } from '../Button'
import { Menu } from './index'

const items = [
  { label: 'Edit', action: vi.fn() },
  { label: 'Delete', action: vi.fn() },
  { label: 'Share', action: vi.fn() },
]

describe('Menu', () => {
  it('exposes menu-button semantics and opens from pointer interaction', async () => {
    const user = userEvent.setup()

    render(
      <Menu
        trigger={<Button>Options</Button>}
        items={items}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Options' })

    expect(trigger).toHaveAttribute('aria-haspopup', 'menu')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')

    await user.click(trigger)

    const menu = screen.getByRole('menu')

    expect(trigger).toHaveAttribute('aria-expanded', 'true')
    expect(menu).toHaveAttribute('aria-labelledby', trigger.id)
    expect(screen.getByRole('menuitem', { name: 'Edit' })).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Delete' })).toBeInTheDocument()
  })

  it('supports keyboard opening, roving focus, and Escape dismissal', async () => {
    const user = userEvent.setup()

    render(
      <Menu
        trigger={<Button>Actions</Button>}
        items={items}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Actions' })

    trigger.focus()
    await user.keyboard('{ArrowDown}')

    const firstItem = screen.getByRole('menuitem', { name: 'Edit' })
    const secondItem = screen.getByRole('menuitem', { name: 'Delete' })

    expect(firstItem).toHaveFocus()

    await user.keyboard('{ArrowDown}')

    expect(secondItem).toHaveFocus()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
    expect(trigger).toHaveFocus()
  })

  it('dismisses when the user clicks outside the menu', async () => {
    const user = userEvent.setup()

    render(
      <Menu
        trigger={<Button>Open menu</Button>}
        items={items}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Open menu' }))

    expect(screen.getByRole('menu')).toBeInTheDocument()

    await user.click(document.body)

    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('respects controlled state and reports open changes without mutating locally', async () => {
    const user = userEvent.setup()
    const handleOpenChange = vi.fn()

    render(
      <Menu
        trigger={<Button>Controlled</Button>}
        items={items}
        isOpen={false}
        onOpenChange={handleOpenChange}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Controlled' }))

    expect(handleOpenChange).toHaveBeenCalledWith(true)
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })
})

import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen, fireEvent, waitFor } from '@/testing/render'
import { Button } from '../Button'
import { Sheet } from '../Sheet'
import { UIProvider } from '../UIProvider'
import { Menu } from './index'

const items = [
  { label: 'Edit', action: vi.fn() },
  { label: 'Delete', action: vi.fn() },
  { label: 'Share', action: vi.fn() },
]

const submenuItems = [
  { label: 'Share', action: vi.fn() },
  {
    label: 'More options',
    submenu: [
      { label: 'Duplicate', action: vi.fn() },
      { label: 'Rename', action: vi.fn() },
    ],
  },
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

  it('opens a submenu on pointer hover and activates nested items', async () => {
    const user = userEvent.setup()

    render(
      <Menu
        trigger={<Button>Advanced</Button>}
        items={submenuItems}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Advanced' }))
    await user.hover(screen.getByRole('menuitem', { name: 'More options' }))

    const submenu = screen.getByRole('menu', { name: 'More options' })
    expect(submenu).toBeInTheDocument()
    expect(screen.getByRole('menuitem', { name: 'Duplicate' })).not.toHaveFocus()

    await user.click(screen.getByRole('menuitem', { name: 'Duplicate' }))

    expect(submenuItems[1].submenu?.[0].action).toHaveBeenCalledTimes(1)
    expect(screen.queryByRole('menu', { name: 'More options' })).not.toBeInTheDocument()
    expect(screen.queryByRole('menu')).not.toBeInTheDocument()
  })

  it('supports keyboard navigation into and out of submenus', async () => {
    const user = userEvent.setup()

    render(
      <Menu
        trigger={<Button>Advanced keyboard</Button>}
        items={submenuItems}
      />
    )

    const trigger = screen.getByRole('button', { name: 'Advanced keyboard' })

    trigger.focus()
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowDown}')
    await user.keyboard('{ArrowRight}')

    const duplicate = screen.getByRole('menuitem', { name: 'Duplicate' })
    expect(duplicate).toHaveFocus()

    await user.keyboard('{ArrowLeft}')
    expect(screen.getByRole('menuitem', { name: 'More options' })).toHaveFocus()
  })

  it('renders section labels and separators for grouped actions', async () => {
    const user = userEvent.setup()

    render(
      <Menu
        trigger={<Button>Grouped</Button>}
        items={[
          { section: 'File', label: 'New', action: vi.fn() },
          { section: 'File', label: 'Open', action: vi.fn() },
          { section: 'Danger zone', label: 'Delete project', destructive: true, action: vi.fn() },
        ]}
      />
    )

    await user.click(screen.getByRole('button', { name: 'Grouped' }))

    expect(screen.getByText('File')).toBeInTheDocument()
    expect(screen.getByText('Danger zone')).toBeInTheDocument()
    expect(screen.getAllByRole('separator')).toHaveLength(1)
    expect(screen.getByRole('menuitem', { name: 'Delete project' })).toHaveAttribute('data-destructive', 'true')
  })
})

it('opens from ArrowUp, wraps focus and skips disabled actions at both ends', async () => {
  const user = userEvent.setup()
  render(<Menu trigger={<Button>Keyboard actions</Button>} items={[
    { label: 'Unavailable first', disabled: true },
    { label: 'Edit draft' },
    { label: 'Share draft' },
    { label: 'Unavailable last', disabled: true },
  ]} />)
  const trigger = screen.getByRole('button', { name: 'Keyboard actions' })
  trigger.focus()
  await user.keyboard('{ArrowUp}')
  expect(screen.getByRole('menuitem', { name: 'Share draft' })).toHaveFocus()
  await user.keyboard('{Home}')
  expect(screen.getByRole('menuitem', { name: 'Edit draft' })).toHaveFocus()
  await user.keyboard('{ArrowUp}')
  expect(screen.getByRole('menuitem', { name: 'Share draft' })).toHaveFocus()
  await user.keyboard('{ArrowDown}')
  expect(screen.getByRole('menuitem', { name: 'Edit draft' })).toHaveFocus()
  await user.keyboard('{End}')
  expect(screen.getByRole('menuitem', { name: 'Share draft' })).toHaveFocus()
  await user.keyboard('{Tab}')
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

it.each([{ entries: [] }, { entries: [{ label: 'Unavailable', disabled: true }] }])('handles a menu with no enabled actions without moving focus to a disabled item', async ({ entries }) => {
  const user = userEvent.setup()
  render(<Menu trigger={<Button>No actions</Button>} items={entries} />)
  const trigger = screen.getByRole('button', { name: 'No actions' })
  trigger.focus()
  await user.keyboard('{ArrowDown}')
  expect(trigger).toHaveFocus()
  expect(screen.queryAllByRole('menuitem').every(item => item.hasAttribute('disabled'))).toBe(true)
  await user.click(trigger)
  expect(screen.queryByRole('menu')).not.toBeInTheDocument()
})

it('escapes a clipping pane while retaining the nearest modal focus scope and local theme', async () => {
  const user = userEvent.setup(), action = vi.fn()
  render(<UIProvider theme="dark"><Sheet isPresented title="Editor">
    <div style={{ overflow: 'hidden', height: 44 }}><Menu trigger={<Button>Editor actions</Button>} items={[{ label: 'Save draft', action }]} /></div>
  </Sheet></UIProvider>)
  await user.click(screen.getByRole('button', { name: 'Editor actions' }))
  const menu = screen.getByRole('menu')
  expect(menu.parentElement).toBe(screen.getByRole('dialog', { name: 'Editor' }))
  expect(menu).toHaveAttribute('data-theme', 'dark')
  expect(screen.getByRole('menuitem', { name: 'Save draft' })).toHaveFocus()
  await user.click(screen.getByRole('menuitem', { name: 'Save draft' }))
  expect(action).toHaveBeenCalledOnce()
  expect(screen.getByRole('dialog', { name: 'Editor' })).toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Editor actions' })).toHaveFocus()
})

it.each([
  ['top', '100px', '96px', 'translateY(-100%)'],
  ['left', '96px', '100px', 'translateX(-100%)'],
  ['right', '164px', '100px', 'none'],
] as const)('keeps a %s menu anchored when its trigger scrolls', async (placement, left, top, transform) => {
  let anchorTop = 100
  const rect = vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockImplementation(() => ({
    x: 100, y: anchorTop, left: 100, top: anchorTop, right: 160, bottom: anchorTop + 44, width: 60, height: 44,
  }) as globalThis.DOMRect)
  try {
    render(<Menu isOpen placement={placement} trigger={<Button>Actions</Button>} items={[{ label: 'Edit' }]} />)
    const menu = screen.getByRole('menu')
    expect(menu).toHaveStyle({ position: 'fixed', left, top, transform })
    anchorTop += 100
    fireEvent.scroll(window)
    await waitFor(() => expect(menu.style.top).toBe(`${parseFloat(top) + 100}px`))
  } finally { rect.mockRestore() }
})

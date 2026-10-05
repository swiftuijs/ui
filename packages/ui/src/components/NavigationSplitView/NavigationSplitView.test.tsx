import { Profiler, useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'

import { act, render, screen } from '@/testing/render'

import { NavigationSplitView } from './index'

it('only commits automatic layout updates when the container crosses its current breakpoint', () => {
  let resize: (entries: { contentRect: { width: number } }[]) => void = () => {}
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: typeof resize) { resize = callback }
    observe() {}
    disconnect() {}
  })
  const committed = vi.fn()
  const view = (content?: React.ReactNode) => <Profiler id="split" onRender={committed}>
    <NavigationSplitView sidebar="Sidebar" detail="Detail" content={content} />
  </Profiler>
  const { rerender, unmount } = render(view())
  try {
    committed.mockClear()
    act(() => resize([{ contentRect: { width: 900 } }]))
    act(() => resize([{ contentRect: { width: 910 } }]))
    expect(committed).not.toHaveBeenCalled()
    act(() => resize([{ contentRect: { width: 390 } }]))
    expect(screen.getByRole('navigation', { name: 'Columns' })).toBeInTheDocument()
    committed.mockClear()
    act(() => resize([{ contentRect: { width: 400 } }]))
    expect(committed).not.toHaveBeenCalled()
    act(() => resize([{ contentRect: { width: 900 } }]))
    expect(screen.getByRole('complementary')).toHaveTextContent('Sidebar')
    rerender(view('Content'))
    act(() => resize([{ contentRect: { width: 900 } }]))
    expect(screen.getByRole('navigation', { name: 'Columns' })).toBeInTheDocument()
    rerender(view())
    act(() => resize([{ contentRect: { width: 900 } }]))
    expect(screen.getByRole('complementary')).toBeInTheDocument()
  } finally { unmount(); vi.unstubAllGlobals() }
})

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

  it('can hide the sidebar in double-column visibility when content is present', () => {
    render(
      <NavigationSplitView
        columnVisibility="doubleColumn"
        sidebar={<div>Sidebar</div>}
        content={<div>Content</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(screen.queryByRole('complementary', { name: 'Sidebar' })).not.toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Content' })).toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Detail')
  })

  it('can reduce the layout to detail-only visibility', () => {
    render(
      <NavigationSplitView
        columnVisibility="detailOnly"
        sidebar={<div>Sidebar</div>}
        content={<div>Content</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(screen.queryByRole('complementary', { name: 'Sidebar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Content' })).not.toBeInTheDocument()
    expect(screen.getByRole('main')).toHaveTextContent('Detail')
  })

  it('uses uncontrolled preferred compact column when compact mode is enabled', async () => {
    render(
      <NavigationSplitView
        compact
        defaultCompactColumn="sidebar"
        sidebar={<div>Sidebar</div>}
        content={<div>Content</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(screen.getByRole('main')).toHaveTextContent('Sidebar')
  })

  it('falls back from compact content to detail when no content column exists', () => {
    const handleCompactColumnChange = vi.fn()

    render(
      <NavigationSplitView
        compact
        compactColumn="content"
        onCompactColumnChange={handleCompactColumnChange}
        sidebar={<div>Sidebar</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(handleCompactColumnChange).toHaveBeenCalledWith('detail')
    expect(screen.getByRole('main')).toHaveTextContent('Detail')
  })

  it('supports uncontrolled preferred column visibility in regular layouts', () => {
    render(
      <NavigationSplitView
        defaultColumnVisibility="detailOnly"
        sidebar={<div>Sidebar</div>}
        content={<div>Content</div>}
        detail={<div>Detail</div>}
      />,
    )

    expect(screen.queryByRole('complementary', { name: 'Sidebar' })).not.toBeInTheDocument()
    expect(screen.queryByRole('region', { name: 'Content' })).not.toBeInTheDocument()
  })

  it('lets external state drive compact column changes', async () => {
    const user = userEvent.setup()

    function ControlledSplitView() {
      const [compactColumn, setCompactColumn] = useState<'sidebar' | 'content' | 'detail'>('sidebar')

      return (
        <>
          <button type="button" onClick={() => setCompactColumn('detail')}>
            Show detail column
          </button>
          <NavigationSplitView
            compact
            compactColumn={compactColumn}
            sidebar={<div>Sidebar</div>}
            content={<div>Content</div>}
            detail={<div>Detail</div>}
          />
        </>
      )
    }

    render(<ControlledSplitView />)

    expect(screen.getByRole('main')).toHaveTextContent('Sidebar')

    await user.click(screen.getByRole('button', { name: 'Show detail column' }))

    expect(screen.getByRole('main')).toHaveTextContent('Detail')
  })

  it('lets external state drive column visibility changes', async () => {
    const user = userEvent.setup()

    function ControlledSplitView() {
      const [columnVisibility, setColumnVisibility] = useState<'automatic' | 'all' | 'doubleColumn' | 'detailOnly'>('detailOnly')

      return (
        <>
          <button type="button" onClick={() => setColumnVisibility('all')}>
            Show all columns
          </button>
          <NavigationSplitView
            columnVisibility={columnVisibility}
            sidebar={<div>Sidebar</div>}
            content={<div>Content</div>}
            detail={<div>Detail</div>}
          />
        </>
      )
    }

    render(<ControlledSplitView />)

    expect(screen.queryByRole('complementary', { name: 'Sidebar' })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Show all columns' }))

    expect(screen.getByRole('complementary', { name: 'Sidebar' })).toBeInTheDocument()
    expect(screen.getByRole('region', { name: 'Content' })).toBeInTheDocument()
  })
})

it('adapts to its container and keeps every compact column reachable', async () => {
  let resize: (entries: { contentRect: { width: number } }[]) => void = () => {}
  const disconnect = vi.fn()
  vi.stubGlobal('ResizeObserver', class {
    constructor(callback: typeof resize) { resize = callback }
    observe() {}
    disconnect = disconnect
  })
  try {
    const user = userEvent.setup()
    const { unmount } = render(<NavigationSplitView sidebar={<div>Library navigation</div>} detail={<div>Selected detail</div>} />)
    const { act } = await import('@testing-library/react')
    act(() => resize([{ contentRect: { width: 390 } }]))
    expect(screen.getByRole('navigation', { name: 'Columns' })).toBeInTheDocument()
    expect(screen.queryByRole('complementary')).not.toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'Navigation' }))
    expect(screen.getByRole('main')).toHaveTextContent('Library navigation')
    act(() => resize([{ contentRect: { width: 900 } }]))
    expect(screen.getByRole('complementary')).toHaveTextContent('Library navigation')
    expect(screen.getByRole('main')).toHaveTextContent('Selected detail')
    unmount()
    expect(disconnect).toHaveBeenCalledOnce()
  } finally { vi.unstubAllGlobals() }
})

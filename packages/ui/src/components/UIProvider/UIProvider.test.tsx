import { describe, it, expect, vi } from 'vitest'
import { renderToString } from 'react-dom/server'
import { render, screen } from '@/testing/render'
import { UIProvider, useUIConfig } from '.'
import { Glass } from '../Glass'
import { Sheet } from '../Sheet'
import { Alert } from '../Alert'
import { ConfirmationDialog } from '../ConfirmationDialog'
import { Menu } from '../Menu'
import { Toolbar } from '../Toolbar'
import { TabView } from '../TabView'
import { resolveGlass, themeStyle, defaultGlass } from '@/contexts/ui-config'

function ReadConfig() { return <output>{JSON.stringify(useUIConfig())}</output> }
describe('scoped UI configuration', () => {
  it('merges nested configuration without changing a sibling scope', () => {
    const { container } = render(<><UIProvider theme="dark" accentColor="#7652aa" glass tokens={{ '--sw-radius-sheet': '24px' }}>
      <UIProvider tokens={{ '--sw-font-size-body': '18px' }}><ReadConfig /></UIProvider>
      <UIProvider theme="light" glass={false}><ReadConfig /></UIProvider>
    </UIProvider><UIProvider><ReadConfig /></UIProvider></>)
    const outputs = [...container.querySelectorAll('output')].map(node => JSON.parse(node.textContent!))
    expect(outputs[0]).toMatchObject({ theme: 'dark', accentColor: '#7652aa', tokens: { '--sw-radius-sheet': '24px', '--sw-font-size-body': '18px' }, glass: { enabled: true } })
    expect(outputs[1]).toMatchObject({ theme: 'light', glass: { enabled: false } })
    expect(outputs[2]).toMatchObject({ theme: 'system', tokens: {}, glass: { enabled: false } })
    expect(document.documentElement).not.toHaveAttribute('data-theme')
  })
  it('keeps SSR system theme deterministic without reading the browser', () => {
    const markup = renderToString(<UIProvider theme="system" glass><Glass>Controls</Glass></UIProvider>)
    expect(markup).toContain('data-theme="system"')
    expect(markup).toContain('data-glass="on"')
    expect(markup).toContain('data-ready="false"')
    expect(markup).not.toContain('<feDisplacementMap')
    expect(markup).toBe(renderToString(<UIProvider theme="system" glass><Glass>Controls</Glass></UIProvider>))
  })
  it('supports component overrides, zero intensity, and custom inline styles', () => {
    render(<UIProvider glass={{ renderer: 'css' }}><Glass glass={false}>Off</Glass><Glass glass={{ intensity: 0 }}>Zero</Glass>
      <Glass glass={{ intensity: 2, variant: 'clear', renderer: 'auto' }} style={{ padding: 5 }}>Strong</Glass></UIProvider>)
    expect(screen.getByText('Off')).toHaveAttribute('data-glass', 'off')
    expect(screen.getByText('Zero')).toHaveAttribute('data-glass', 'off')
    expect(screen.getByText('Strong')).toHaveAttribute('data-glass', 'on')
    expect(screen.getByText('Strong')).toHaveStyle({ padding: '5px', '--sw-glass-blur': '3px' })
    expect(screen.getByText('Zero')).toHaveAttribute('data-glass-renderer', 'css')
    expect(screen.getByText('Strong')).toHaveAttribute('data-glass-renderer', 'auto')
    expect(screen.getByText('Off').querySelector('.sw-glass-backdrop')).toBeNull()
  })
  it('propagates a scoped theme and tokens into portaled dialogs', () => {
    render(<UIProvider theme="dark" accentColor="#7652aa" tokens={{ '--sw-radius-sheet': '24px' }}>
      <Sheet title="Scoped dialog" isPresented onDismiss={vi.fn()}>Content</Sheet>
    </UIProvider>)
    const dialog = screen.getByRole('dialog', { name: 'Scoped dialog' })
    expect(dialog).toHaveAttribute('data-theme', 'dark')
    expect(dialog).toHaveStyle({ '--sw-accent-color': '#7652aa', '--sw-radius-sheet': '24px' })
    expect(dialog.closest('.sw-ui-provider')).toBeNull()
  })
  it('applies material to navigation controls and keeps tab content untouched', () => {
    const { container } = render(<UIProvider glass>
      <Menu isOpen trigger={<button>Actions</button>} items={[{ label: 'Edit' }]} />
      <Toolbar items={[{ placement: 'navigation', content: <button>Back</button> }]} />
      <TabView items={[{ label: 'Home', content: <div>Content</div> }]} />
    </UIProvider>)
    expect(screen.getByRole('menu')).toHaveAttribute('data-glass', 'on')
    expect(screen.getByRole('tablist')).toHaveAttribute('data-glass', 'on')
    expect(container.querySelector('.sw-toolbar-group')).toHaveAttribute('data-glass', 'on')
    expect(screen.getByRole('tabpanel')).not.toHaveAttribute('data-glass')
  })
  it.each([
    ['Sheet', '.sw-sheet-content', <Sheet title="Material sheet" isPresented>Content</Sheet>],
    ['Alert', '.sw-alert-content', <Alert title="Material alert" isVisible onDismiss={vi.fn()} />],
    ['ConfirmationDialog', '.sw-confirmation-dialog-content', <ConfirmationDialog title="Material actions" isVisible onDismiss={vi.fn()} actions={[{ label: 'Cancel' }]} />],
  ])('%s inherits the toggle in its portal and defaults to regular over a clear global preference', (_name, selector, component) => {
    const { rerender } = render(<UIProvider glass={{ enabled: true, variant: 'clear' }}>{component}</UIProvider>)
    const surface = document.querySelector(selector)!
    expect(surface).toHaveAttribute('data-glass', 'on')
    expect(surface).toHaveAttribute('data-glass-variant', 'regular')
    rerender(<UIProvider glass={false}>{component}</UIProvider>)
    expect(surface).toHaveAttribute('data-glass', 'off')
  })
  it('respects local presentation overrides and keeps full-screen or explicit sheet backgrounds independent', () => {
    const { rerender } = render(<UIProvider glass>
      <Sheet title="Overridden" isPresented glass={false}>Content</Sheet>
    </UIProvider>)
    expect(document.querySelector('.sw-sheet-content')).toHaveAttribute('data-glass', 'off')
    rerender(<UIProvider glass><Sheet title="Overridden" isPresented presentationStyle="fullScreen" glass>Content</Sheet></UIProvider>)
    expect(document.querySelector('.sw-sheet-content')).toHaveAttribute('data-glass', 'off')
    rerender(<UIProvider glass><Sheet title="Overridden" isPresented backgroundStyle="thinMaterial">Content</Sheet></UIProvider>)
    expect(document.querySelector('.sw-sheet-content')).toHaveAttribute('data-glass', 'off')
    rerender(<UIProvider glass><Alert title="Explicit clear" isVisible onDismiss={vi.fn()} glass={{ variant: 'clear' }} /></UIProvider>)
    expect(document.querySelector('.sw-alert-content')).toHaveAttribute('data-glass-variant', 'clear')
  })
})
it('normalizes glass preferences and theme overrides', () => {
  expect(resolveGlass(undefined)).toEqual(defaultGlass)
  expect(resolveGlass({ intensity: -1 })).toMatchObject({ enabled: true, intensity: 0 })
  expect(resolveGlass({ intensity: NaN })).toMatchObject({ intensity: 0.5 })
  expect(resolveGlass(true, { enabled: false, intensity: 0.7, variant: 'clear' })).toMatchObject({ enabled: true, intensity: 0.7, variant: 'clear' })
  expect(resolveGlass({ variant: undefined }, { enabled: false, intensity: 0.7, variant: 'clear' })).toEqual({ enabled: true, intensity: 0.7, variant: 'clear', renderer: 'auto' })
  expect(themeStyle({ tokens: { '--sw-accent-color': '#123456' }, glass: defaultGlass, accentColor: '#abcdef' })).toMatchObject({ '--sw-accent-color': '#123456', '--sw-color-action-fill': '#abcdef' })
})

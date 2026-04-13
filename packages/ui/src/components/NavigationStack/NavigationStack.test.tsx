import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, act } from '@testing-library/react'
import { NavigationStack } from './index'
import { useNaviContext } from '@/contexts'
import { eventBus } from '@/common'

const viewTransition = {
  type: 'view-transition' as const,
}

function HomePage() {
  const navi = useNaviContext()

  return (
    <button
      type="button"
      onClick={() => {
        navi.append({
          id: 'page-a',
          component: PageA,
          transition: viewTransition,
        })
      }}
    >
      Open page A
    </button>
  )
}

function PageA() {
  const navi = useNaviContext()

  return (
    <>
      <div>Page A</div>
      <button
        type="button"
        onClick={() => {
          navi.append({
            id: 'page-b',
            component: PageB,
            transition: viewTransition,
          })
        }}
      >
        Open page B
      </button>
      <button type="button" onClick={() => navi.dismiss()}>
        Dismiss page
      </button>
    </>
  )
}

function PageB() {
  const navi = useNaviContext()

  return (
    <>
      <div>Page B</div>
      <button
        type="button"
        onClick={() => {
          navi.append({
            id: 'page-a',
            component: PageA,
            transition: viewTransition,
          })
        }}
      >
        Revisit page A
      </button>
    </>
  )
}

function HomePageWithoutViewTransition() {
  const navi = useNaviContext()

  return (
    <button
      type="button"
      onClick={() => {
        navi.append({
          id: 'plain-page-a',
          component: PlainPageA,
        })
      }}
    >
      Open plain page A
    </button>
  )
}

function PlainPageA() {
  const navi = useNaviContext()

  return (
    <>
      <div>Plain Page A</div>
      <button type="button" onClick={() => navi.dismiss()}>
        Dismiss plain page
      </button>
    </>
  )
}

function PreloadedPage() {
  return <div>Preloaded Page</div>
}

describe('NavigationStack', () => {
  afterEach(() => {
    Reflect.deleteProperty(document, 'startViewTransition')
    Reflect.deleteProperty(globalThis, 'requestIdleCallback')
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('returns to the previous page when revisiting an existing page in the path', () => {
    const startViewTransition = vi.fn((update: () => void) => {
      update()
      return {
        finished: Promise.resolve(),
        types: new Set<string>(),
      }
    })
    Object.defineProperty(document, 'startViewTransition', {
      configurable: true,
      writable: true,
      value: startViewTransition,
    })

    render(
      <NavigationStack>
        <HomePage />
      </NavigationStack>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open page A' }))
    expect(screen.getByText('Page A')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Open page B' }))
    expect(screen.getByText('Page B')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Revisit page A' }))
    expect(screen.getByText('Page A')).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss page' }))

    expect(screen.getByText('Page B')).toBeInTheDocument()
    expect(screen.queryByText('Page A')).not.toBeInTheDocument()
  })

  it('fires page-entered once and completes the non-view-transition enter and exit lifecycle', async () => {
    vi.useFakeTimers()

    Object.defineProperty(globalThis, 'requestIdleCallback', {
      configurable: true,
      writable: true,
      value: (callback: IdleRequestCallback) => setTimeout(
        () => callback({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline),
        0,
      ),
    })

    const emitSpy = vi.spyOn(eventBus, 'emit')

    render(
      <NavigationStack>
        <HomePageWithoutViewTransition />
      </NavigationStack>
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open plain page A' }))

    const plainPage = document.getElementById('page$$plain-page-a')
    expect(plainPage).toHaveAttribute('data-page-status', 'entering')
    expect(screen.getByText('Plain Page A')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open plain page A' })).toBeInTheDocument()

    fireEvent.animationEnd(plainPage!)

    const pageEnteredCalls = emitSpy.mock.calls.filter(
      ([eventName, pageId]) => eventName.toString().endsWith('.page-entered') && pageId === 'page$$plain-page-a',
    )
    expect(pageEnteredCalls).toHaveLength(1)
    expect(screen.queryByRole('button', { name: 'Open plain page A' })).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss plain page' }))

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0)
    })

    const exitingPage = document.getElementById('page$$plain-page-a')
    expect(exitingPage).toHaveAttribute('data-page-status', 'exiting')
    expect(screen.getByRole('button', { name: 'Open plain page A' })).toBeInTheDocument()

    fireEvent.animationEnd(exitingPage!)

    expect(screen.getByRole('button', { name: 'Open plain page A' })).toBeInTheDocument()
    expect(screen.queryByText('Plain Page A')).not.toBeInTheDocument()
  })

  it('supports a default path and shows the top-most page on first render', () => {
    render(
      <NavigationStack
        defaultPath={[
          {
            component: PreloadedPage,
            id: 'preloaded',
          },
        ]}
      >
        <HomePageWithoutViewTransition />
      </NavigationStack>,
    )

    expect(screen.getByText('Preloaded Page')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Open plain page A' })).not.toBeInTheDocument()
  })

  it('reports public path changes when pages are pushed and removed', async () => {
    vi.useFakeTimers()

    Object.defineProperty(globalThis, 'requestIdleCallback', {
      configurable: true,
      writable: true,
      value: (callback: IdleRequestCallback) => setTimeout(
        () => callback({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline),
        0,
      ),
    })

    const handlePathChange = vi.fn()

    render(
      <NavigationStack onPathChange={handlePathChange}>
        <HomePageWithoutViewTransition />
      </NavigationStack>,
    )

    fireEvent.click(screen.getByRole('button', { name: 'Open plain page A' }))
    fireEvent.animationEnd(document.getElementById('page$$plain-page-a')!)

    expect(handlePathChange).toHaveBeenLastCalledWith([
      {
        id: 'plain-page-a',
        type: 'page',
      },
    ])

    fireEvent.click(screen.getByRole('button', { name: 'Dismiss plain page' }))

    await act(async () => {
      await vi.advanceTimersByTimeAsync(0)
    })

    fireEvent.animationEnd(document.getElementById('page$$plain-page-a')!)

    expect(handlePathChange).toHaveBeenLastCalledWith([])
  })
})

import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { NavigationStack } from './index'
import { useNaviContext } from '@/contexts'

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

describe('NavigationStack', () => {
  afterEach(() => {
    Reflect.deleteProperty(document, 'startViewTransition')
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
})

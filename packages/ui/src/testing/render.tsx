import type { PropsWithChildren, ReactElement } from 'react'
import {
  render as rtlRender,
  type RenderOptions,
  type RenderResult,
} from '@testing-library/react'

function TestProviders({ children }: PropsWithChildren) {
  return <>{children}</>
}

export function render(
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult {
  return rtlRender(ui, {
    wrapper: TestProviders,
    ...options,
  })
}

export * from '@testing-library/react'

import { memo, useContext } from 'react'
import { render, screen } from '@testing-library/react'
import { expect, it, vi } from 'vitest'
import { LayoutContext } from '@/contexts'
import { BaseStack } from './BaseStack'

it('keeps layout consumers stable until the stack direction changes', () => {
  const rendered = vi.fn()
  const Probe = memo(function Probe() {
    const layout = useContext(LayoutContext)
    rendered(layout.boxDirection)
    return <output>{layout.boxDirection}</output>
  })
  const child = <Probe />
  const { rerender } = render(<BaseStack direction="row" stackClassName="hstack">{child}</BaseStack>)
  rendered.mockClear()
  rerender(<BaseStack direction="row" stackClassName="hstack" spacing={12}>{child}</BaseStack>)
  expect(rendered).not.toHaveBeenCalled()
  rerender(<BaseStack direction="column" stackClassName="vstack">{child}</BaseStack>)
  expect(screen.getByRole('status')).toHaveTextContent('column')
  expect(rendered).toHaveBeenCalledOnce()
})

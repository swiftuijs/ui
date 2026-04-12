import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { SafeAreaInset } from './index'

describe('SafeAreaInset', () => {
  it('renders inset content alongside the main content and marks the selected edge', () => {
    render(
      <SafeAreaInset edge="bottom" inset={<button type="button">Compose</button>}>
        <div>Mail list</div>
      </SafeAreaInset>
    )

    const inset = screen.getByRole('complementary')

    expect(inset).toHaveAttribute('data-edge', 'bottom')
    expect(screen.getByRole('button', { name: 'Compose' })).toBeInTheDocument()
    expect(screen.getByText('Mail list')).toBeInTheDocument()
  })
})

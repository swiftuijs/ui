import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { NavigationLink } from '.'

const navigation = vi.hoisted(() => ({ append: vi.fn(), removeLast: vi.fn() }))
vi.mock('@/contexts', () => ({ useNaviContext: () => navigation }))
it('uses a real link for URL destinations', () => {
  render(<NavigationLink destination="/settings">Settings</NavigationLink>)
  expect(screen.getByRole('link', { name: 'Settings' })).toHaveAttribute('href', '/settings')
})
describe('keyboard navigation actions', () => {
  it('opens an internal destination with Enter', async () => {
    const Destination = () => <div>Destination</div>
    render(<NavigationLink destination={Destination}>Open</NavigationLink>)
    const button = screen.getByRole('button', { name: 'Open' })
    button.focus()
    await userEvent.keyboard('{Enter}')
    expect(navigation.append).toHaveBeenCalledWith(expect.objectContaining({ component: Destination }))
  })
  it('dismisses with Space', async () => {
    render(<NavigationLink dismiss>Back</NavigationLink>)
    screen.getByRole('button', { name: 'Back' }).focus()
    await userEvent.keyboard(' ')
    expect(navigation.removeLast).toHaveBeenCalledOnce()
  })
})

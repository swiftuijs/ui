import { describe, expect, it, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@/testing/render'
import { DisclosureGroup } from './index'

describe('DisclosureGroup', () => {
  it('links the toggle to its content with stable aria ids', () => {
    render(
      <DisclosureGroup label="More Info" defaultExpanded>
        <div>Hidden content</div>
      </DisclosureGroup>
    )

    const button = screen.getByRole('button', { name: 'More Info' })
    const region = screen.getByRole('region', { name: 'More Info' })

    expect(button).toHaveAttribute('aria-expanded', 'true')
    expect(button).toHaveAttribute('aria-controls', region.id)
    expect(region).toHaveAttribute('aria-labelledby', button.id)
  })

  it('toggles uncontrolled disclosure state when activated', async () => {
    const user = userEvent.setup()

    render(
      <DisclosureGroup label="Details">
        <div>Expanded content</div>
      </DisclosureGroup>
    )

    const toggle = screen.getByRole('button', { name: 'Details' })

    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Expanded content')).not.toBeInTheDocument()

    await user.click(toggle)

    expect(toggle).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByRole('region', { name: 'Details' })).toHaveTextContent('Expanded content')
  })

  it('reports controlled state changes without mutating local state', async () => {
    const user = userEvent.setup()
    const handleExpandedChange = vi.fn()

    render(
      <DisclosureGroup
        label="Controlled"
        expanded={false}
        onExpandedChange={handleExpandedChange}
      >
        <div>Controlled content</div>
      </DisclosureGroup>
    )

    const toggle = screen.getByRole('button', { name: 'Controlled' })

    await user.click(toggle)

    expect(handleExpandedChange).toHaveBeenCalledWith(true)
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
    expect(screen.queryByText('Controlled content')).not.toBeInTheDocument()
  })
})

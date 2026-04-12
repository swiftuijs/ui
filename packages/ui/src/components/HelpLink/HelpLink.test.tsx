import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { HelpLink } from './index'

describe('HelpLink', () => {
  it('renders an external help affordance with a default label', () => {
    render(<HelpLink href="https://example.com/help" />)

    const link = screen.getByRole('link', { name: 'Get help' })

    expect(link).toHaveAttribute('href', 'https://example.com/help')
    expect(link).toHaveAttribute('target', '_blank')
    expect(link).toHaveAttribute('rel', expect.stringContaining('noreferrer'))
  })
})

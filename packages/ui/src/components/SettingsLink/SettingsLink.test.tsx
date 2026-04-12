import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { SettingsLink } from './index'

describe('SettingsLink', () => {
  it('renders a settings destination with a default label', () => {
    render(<SettingsLink href="/settings/account" />)

    const link = screen.getByRole('link', { name: 'Settings' })

    expect(link).toHaveAttribute('href', '/settings/account')
  })
})

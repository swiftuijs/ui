import { describe, it, expect } from 'vitest'
import { render, screen } from '@/testing/render'
import { Text } from '../Text'
import { GroupBox } from './index'

describe('GroupBox', () => {
  it('exposes a named group for its label', () => {
    render(
      <GroupBox label="Account settings">
        <Text>Email preferences</Text>
      </GroupBox>
    )

    const group = screen.getByRole('group', { name: 'Account settings' })

    expect(group).toBeInTheDocument()
    expect(screen.getByText('Email preferences')).toBeInTheDocument()
  })
})

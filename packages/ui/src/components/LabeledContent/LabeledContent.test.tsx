import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Text } from '../Text'
import { LabeledContent } from './index'

describe('LabeledContent', () => {
  it('renders label and value content', () => {
    render(<LabeledContent label="Email" value="me@example.com" />)

    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('me@example.com')).toBeInTheDocument()
  })

  it('prefers children when provided', () => {
    render(
      <LabeledContent label="Status">
        <Text>Online</Text>
      </LabeledContent>,
    )

    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Online')).toBeInTheDocument()
  })
})

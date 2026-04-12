import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Button } from '../Button'
import { ContentUnavailableView } from './index'

describe('ContentUnavailableView', () => {
  it('renders an empty-state status with supporting text and actions', () => {
    render(
      <ContentUnavailableView
        title="No favorites yet"
        description="Items you save will appear here."
        actions={<Button>Add item</Button>}
      />,
    )

    const status = screen.getByRole('status')

    expect(status).toBeInTheDocument()
    expect(screen.getByText('No favorites yet')).toBeInTheDocument()
    expect(screen.getByText('Items you save will appear here.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Add item' })).toBeInTheDocument()
  })
})

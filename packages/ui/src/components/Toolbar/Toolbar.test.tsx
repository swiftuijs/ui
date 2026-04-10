import { describe, it, expect } from 'vitest'
import { render, screen } from '@/testing/render'
import { Button } from '../Button'
import { Text } from '../Text'
import { Toolbar } from './index'

describe('Toolbar', () => {
  it('exposes a horizontal toolbar and renders navigation placement items', () => {
    render(
      <Toolbar
        aria-label="Editor actions"
        items={[
          { content: <Button>Back</Button>, placement: 'navigation' },
          { content: <Text>Document</Text>, placement: 'principal' },
          { content: <Button>Save</Button>, placement: 'confirmationAction' },
        ]}
      />
    )

    const toolbar = screen.getByRole('toolbar', { name: 'Editor actions' })

    expect(toolbar).toHaveAttribute('aria-orientation', 'horizontal')
    expect(screen.getByRole('button', { name: 'Back' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument()
    expect(screen.getByText('Document')).toBeInTheDocument()
  })
})

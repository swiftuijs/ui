import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

import { SearchField } from '.'

describe('SearchField', () => {
  it('renders a search input and emits value-first updates', () => {
    const onValueChange = vi.fn()

    render(<SearchField defaultValue="tea" label="Search" onValueChange={onValueChange} />)

    const input = screen.getByRole('searchbox', { name: 'Search' })
    fireEvent.change(input, { target: { value: 'coffee' } })

    expect(input).toHaveValue('coffee')
    expect(onValueChange).toHaveBeenCalledWith('coffee')
  })

  it('submits the current value when enter is pressed', () => {
    const onSubmit = vi.fn()

    render(<SearchField defaultValue="matcha" label="Filter items" onSubmit={onSubmit} />)

    const input = screen.getByRole('searchbox', { name: 'Filter items' })
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(onSubmit).toHaveBeenCalledWith('matcha')
  })
})

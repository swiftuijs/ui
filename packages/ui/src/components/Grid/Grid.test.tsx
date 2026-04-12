import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Grid } from './index'
import { GridRow } from '../GridRow'

describe('Grid', () => {
  it('renders rows and cells inside a grid container', () => {
    render(
      <Grid columns={2} spacing={12}>
        <GridRow>
          <div>One</div>
          <div>Two</div>
        </GridRow>
        <GridRow>
          <div>Three</div>
          <div>Four</div>
        </GridRow>
      </Grid>,
    )

    const grid = screen.getByRole('grid')

    expect(grid).toBeInTheDocument()
    expect(grid).toHaveStyle({
      '--grid-columns': '2',
      '--grid-spacing': '12px',
    })
    expect(screen.getByText('One')).toBeInTheDocument()
    expect(screen.getByText('Four')).toBeInTheDocument()
  })
})

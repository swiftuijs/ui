import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Grid } from '../Grid'
import { GridRow } from './index'

describe('GridRow', () => {
  it('renders a row group with its child cells', () => {
    render(
      <Grid columns={2}>
        <GridRow>
          <div>Left</div>
          <div>Right</div>
        </GridRow>
      </Grid>,
    )

    const row = screen.getByRole('row')

    expect(row).toBeInTheDocument()
    expect(screen.getByText('Left')).toBeInTheDocument()
    expect(screen.getByText('Right')).toBeInTheDocument()
  })
})

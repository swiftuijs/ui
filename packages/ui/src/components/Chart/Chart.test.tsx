import { describe, expect, it } from 'vitest'
import { render, screen } from '@testing-library/react'

import { Chart } from './index'

describe('Chart', () => {
  const data = [
    { id: 'jan', label: 'Jan', value: 12 },
    { id: 'feb', label: 'Feb', value: 24 },
    { id: 'mar', label: 'Mar', value: 18 },
  ]

  it('renders a bar chart by default', () => {
    render(<Chart data={data} label="Revenue" />)

    expect(screen.getByRole('img', { name: 'Revenue' })).toBeInTheDocument()
    expect(screen.getAllByTestId('chart-bar')).toHaveLength(3)
  })

  it('renders a line chart path when mark is line', () => {
    render(<Chart data={data} label="Revenue" mark="line" />)

    expect(screen.getByTestId('chart-line')).toBeInTheDocument()
    expect(screen.queryByTestId('chart-bar')).not.toBeInTheDocument()
  })

  it('shows a caption and value labels when requested', () => {
    render(
      <Chart
        caption="Quarterly revenue"
        data={data}
        label="Revenue"
        showValues
      />,
    )

    expect(screen.getByText('Quarterly revenue')).toBeInTheDocument()
    expect(screen.getByText('24')).toBeInTheDocument()
  })

  it('renders an empty state when there is no data', () => {
    render(<Chart data={[]} emptyState="No data" label="Revenue" />)

    expect(screen.getByText('No data')).toBeInTheDocument()
    expect(screen.queryByRole('img', { name: 'Revenue' })).not.toBeInTheDocument()
  })
})

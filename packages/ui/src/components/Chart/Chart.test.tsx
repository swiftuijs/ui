import { describe, expect, it, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'

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

  it('supports uncontrolled selection for chart marks', () => {
    render(
      <Chart
        data={data}
        defaultSelectedDatumId="jan"
        label="Revenue"
      />,
    )

    const janMark = screen.getByRole('button', { name: 'Jan: 12' })
    const febMark = screen.getByRole('button', { name: 'Feb: 24' })

    expect(janMark).toHaveAttribute('aria-pressed', 'true')
    expect(febMark).toHaveAttribute('aria-pressed', 'false')

    fireEvent.click(febMark)

    expect(janMark).toHaveAttribute('aria-pressed', 'false')
    expect(febMark).toHaveAttribute('aria-pressed', 'true')
  })

  it('supports controlled selection callbacks without mutating local state', () => {
    const handleSelectionChange = vi.fn()

    render(
      <Chart
        data={data}
        label="Revenue"
        onSelectionChange={handleSelectionChange}
        selectedDatumId="jan"
      />,
    )

    const janMark = screen.getByRole('button', { name: 'Jan: 12' })
    const febMark = screen.getByRole('button', { name: 'Feb: 24' })

    fireEvent.click(febMark)

    expect(handleSelectionChange).toHaveBeenCalledWith(data[1])
    expect(janMark).toHaveAttribute('aria-pressed', 'true')
    expect(febMark).toHaveAttribute('aria-pressed', 'false')
  })

  it('uses the provided value formatter in visible labels and accessibility labels', () => {
    render(
      <Chart
        data={data}
        label="Revenue"
        showValues
        valueFormatter={(value) => `$${value}k`}
      />,
    )

    expect(screen.getByText('$24k')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Feb: $24k' })).toBeInTheDocument()
  })
})

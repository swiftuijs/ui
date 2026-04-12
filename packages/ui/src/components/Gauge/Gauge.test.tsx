import { describe, expect, it } from 'vitest'

import { render, screen } from '@/testing/render'

import { Gauge } from './index'

describe('Gauge', () => {
  it('renders a labeled progressbar with value labels', () => {
    render(
      <Gauge
        label="Storage"
        value={64}
        min={0}
        max={128}
        currentValueLabel="64 GB"
        minimumValueLabel="0 GB"
        maximumValueLabel="128 GB"
      />,
    )

    const gauge = screen.getByRole('progressbar', { name: 'Storage' })

    expect(gauge).toHaveAttribute('aria-valuenow', '64')
    expect(gauge).toHaveAttribute('aria-valuemin', '0')
    expect(gauge).toHaveAttribute('aria-valuemax', '128')
    expect(screen.getByText('64 GB')).toBeInTheDocument()
    expect(screen.getByText('0 GB')).toBeInTheDocument()
    expect(screen.getByText('128 GB')).toBeInTheDocument()
  })
})

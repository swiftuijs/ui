import type { Meta, StoryObj } from '@storybook/react-vite'

import { Chart, type IChartProps } from '.'

const meta: Meta<typeof Chart> = {
  title: 'SwiftUI/Chart',
  component: Chart,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IChartProps>

const monthlyRevenue = [
  { id: 'jan', label: 'Jan', value: 12 },
  { id: 'feb', label: 'Feb', value: 24 },
  { id: 'mar', label: 'Mar', value: 18 },
  { id: 'apr', label: 'Apr', value: 30 },
]

export const Bar: Story = {
  args: {
    caption: 'Quarterly revenue',
    data: monthlyRevenue,
    label: 'Revenue',
    mark: 'bar',
    showValues: true,
  },
}

export const Line: Story = {
  args: {
    caption: 'Quarterly revenue',
    data: monthlyRevenue,
    label: 'Revenue',
    mark: 'line',
    showValues: true,
  },
}

export const Empty: Story = {
  args: {
    data: [],
    emptyState: 'No revenue data yet',
    label: 'Revenue',
  },
}

export const Selectable: Story = {
  args: {
    caption: 'Quarterly revenue',
    data: monthlyRevenue,
    defaultSelectedDatumId: 'feb',
    label: 'Revenue',
    mark: 'bar',
    showValues: true,
    valueFormatter: (value) => `$${value}k`,
  },
}

export const LineSelectable: Story = {
  args: {
    caption: 'Quarterly revenue',
    data: monthlyRevenue,
    defaultSelectedDatumId: 'feb',
    label: 'Revenue',
    mark: 'line',
    showValues: true,
    valueFormatter: (value) => `$${value}k`,
  },
}

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '../Card'
import { Grid } from '../Grid'
import { Text } from '../Text'

import { GridRow, type IGridRowProps } from '.'

const meta: Meta<typeof GridRow> = {
  title: 'SwiftUI/GridRow',
  component: GridRow,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IGridRowProps>

export const Default: Story = {
  render: () => (
    <Grid columns={3} spacing={12}>
      <GridRow>
        <Card><Text>Left</Text></Card>
        <Card><Text>Center</Text></Card>
        <Card><Text>Right</Text></Card>
      </GridRow>
    </Grid>
  ),
}

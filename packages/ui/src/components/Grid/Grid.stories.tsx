import type { Meta, StoryObj } from '@storybook/react-vite'

import { Card } from '../Card'
import { GridRow } from '../GridRow'
import { Text } from '../Text'

import { Grid, type IGridProps } from '.'

const meta: Meta<typeof Grid> = {
  title: 'SwiftUI/Grid',
  component: Grid,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<IGridProps>

export const Default: Story = {
  render: () => (
    <Grid columns={2} spacing={12}>
      <GridRow>
        <Card><Text>One</Text></Card>
        <Card><Text>Two</Text></Card>
      </GridRow>
      <GridRow>
        <Card><Text>Three</Text></Card>
        <Card><Text>Four</Text></Card>
      </GridRow>
    </Grid>
  ),
}

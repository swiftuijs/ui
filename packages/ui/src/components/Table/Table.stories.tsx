import type { Meta, StoryObj } from '@storybook/react-vite'

import { Table } from './index'
import { TableColumn } from '../TableColumn'

type Person = {
  id: string
  name: string
  role: string
}

const rows: Person[] = [
  { id: '1', name: 'Mia', role: 'Designer' },
  { id: '2', name: 'Noah', role: 'Engineer' },
]

const meta: Meta<typeof Table<Person>> = {
  title: 'SwiftUI/Table',
  component: Table as never,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Table data={rows} rowKey={(row) => row.id}>
      <TableColumn<Person> title="Name" value={(row) => row.name} />
      <TableColumn<Person> title="Role" value={(row) => row.role} />
    </Table>
  ),
}

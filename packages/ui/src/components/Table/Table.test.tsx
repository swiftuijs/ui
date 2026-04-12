import { describe, expect, it } from 'vitest'

import { render, screen, within } from '@/testing/render'

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

describe('Table', () => {
  it('renders column headers and row content', () => {
    render(
      <Table data={rows} rowKey={(row) => row.id}>
        <TableColumn<Person> title="Name" value={(row) => row.name} />
        <TableColumn<Person> title="Role" value={(row) => row.role} />
      </Table>,
    )

    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Name' })).toBeInTheDocument()
    expect(screen.getByRole('columnheader', { name: 'Role' })).toBeInTheDocument()

    const bodyRows = screen.getAllByRole('row').slice(1)
    expect(within(bodyRows[0]).getByText('Mia')).toBeInTheDocument()
    expect(within(bodyRows[1]).getByText('Engineer')).toBeInTheDocument()
  })
})

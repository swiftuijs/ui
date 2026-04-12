import { describe, expect, it } from 'vitest'

import { TableColumn } from './index'

describe('TableColumn', () => {
  it('captures table column definitions', () => {
    const column = <TableColumn title="Name" value={(row: { name: string }) => row.name} />

    expect(column.props.title).toBe('Name')
    expect(column.props.value({ name: 'Mia' })).toBe('Mia')
  })
})

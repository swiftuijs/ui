import { Fragment, type ReactNode } from 'react'

/**
 * Column definition helper for Table.
 *
 * @see https://developer.apple.com/documentation/swiftui/tablecolumn
 */
export interface ITableColumnProps<Row> {
  /**
   * The visible header title for this column.
   */
  title: ReactNode
  /**
   * Renderer for each row value in this column.
   */
  value: (row: Row) => ReactNode
}

export function TableColumn<Row>(_props: ITableColumnProps<Row>) {
  return <Fragment />
}

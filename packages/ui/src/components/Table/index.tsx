import { Children, isValidElement, memo, type ReactElement, type ReactNode } from 'react'

import type { IBaseComponent } from '@/types'
import { prefixClass, standardizeProps } from '@/common'

import type { ITableColumnProps } from '../TableColumn'

import './style.scss'

/**
 * A container that presents tabular data using explicit column definitions.
 *
 * @see https://developer.apple.com/documentation/swiftui/table
 */
export interface ITableProps<Row> extends IBaseComponent {
  /**
   * The row data rendered by the table.
   */
  data: Row[]
  /**
   * Stable key generator for each row.
   */
  rowKey: (row: Row, index: number) => string
}

function getColumns<Row>(children: ReactNode) {
  return Children.toArray(children).filter((child): child is ReactElement<ITableColumnProps<Row>> => {
    return isValidElement(child) && typeof (child.props as ITableColumnProps<Row>).value === 'function'
  })
}

export const Table = memo(function Table<Row>(props: ITableProps<Row>) {
  const { data, rowKey, ...restProps } = props
  const { commonProps, restProps: finalRestProps, children } = standardizeProps(restProps, {
    className: prefixClass('table'),
  })
  const columns = getColumns<Row>(children)

  return (
    <div {...commonProps} {...finalRestProps}>
      <table className={prefixClass('table-element')}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index} scope="col">
                {column.props.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={rowKey(row, index)}>
              {columns.map((column, columnIndex) => (
                <td key={columnIndex}>{column.props.value(row)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}) as <Row>(props: ITableProps<Row>) => ReactElement

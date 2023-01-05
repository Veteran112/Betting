import React, { useEffect } from 'react'
import {
  useTable,
  useGlobalFilter,
  useSortBy,
  usePagination
} from 'react-table'
import './index.scss'
import PropTypes from 'prop-types'
import { PrimaryButton } from '../StyledButton'
import SelectBox1 from '../SelectBox1'

const RTable = (props) => {
  const {
    columns,
    data: tableData,
    sortColumns,
    // pageSizes = [10, 20, 30, 40, 50],
    defaultPageSize = 10,
    style = { minHeight: 400, width: '100%' },
    manualPagination = false,
    paginationComponent = <></>,
    recordIncreaseNumber,
    manualSortBy = false,
    columnHeaderClick,
    selectedSorts = {}
  } = props

  const data = React.useMemo(() => [...tableData], [tableData, props])
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: columns.map((column) => {
          if (column.show === false) return column.accessor || column.id
        }),
        sortBy: sortColumns,
        pageSize: defaultPageSize
      },
      disableSortRemove: true,
      manualPagination,
      manualSortBy
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    // eslint-disable-next-line no-unused-vars
    setGlobalFilter,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter }
  } = tableInstance

  useEffect(() => {
    setGlobalFilter(props.setGlobalFilterValue)
  }, [props.setGlobalFilterValue])

  useEffect(() => {}, [globalFilter])

  return (
    <div style={style} className="d-flex flex-column gap-1">
      <table {...getTableProps()} className="r-table r-table-full table-hover">
        <thead className="bg-light font-weight-500 font-size-15">
          {
            // Loop over the header rows
            headerGroups.map((headerGroup, headerKey) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()} key={headerKey}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column, columnKey) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                      key={columnKey}
                      onClick={() => {
                        !column.disableSortBy &&
                          manualSortBy &&
                          columnHeaderClick(column)
                      }}
                    >
                      {column.render('Header')}
                      {column.disableSortBy ? (
                        ''
                      ) : manualSortBy ? (
                        Object.prototype.hasOwnProperty.call(
                          selectedSorts,
                          column.id
                        ) ? (
                          selectedSorts[column.id] === 1 ? (
                            <i className="fas fa-long-arrow-alt-up ml-2" />
                          ) : (
                            <i className="fas fa-long-arrow-alt-down ml-2" />
                          )
                        ) : (
                          <i className="fas fa-long-arrow-alt-up ml-2" />
                        )
                      ) : (
                        <span>
                          {column.disableSortBy ? (
                            ''
                          ) : column.isSorted ? (
                            column.isSortedDesc ? (
                              <i className="fas fa-long-arrow-alt-down ml-2" />
                            ) : (
                              <i className="fas fa-long-arrow-alt-up ml-2" />
                            )
                          ) : (
                            <i className="fas fa-long-arrow-alt-up ml-2" />
                          )}
                        </span>
                      )}
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            page.map((row, rowKey) => {
              // Prepare the row for display
              row.serial =
                recordIncreaseNumber > 1
                  ? recordIncreaseNumber + (rowKey + 1)
                  : rowKey + 1 // Added Custom serial number to the table
              prepareRow(row)
              return (
                // Apply the row props
                <tr {...row.getRowProps({ key: rowKey })} key={rowKey}>
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, cellKey) => {
                      // Apply the cell props
                      return (
                        <td {...cell.getCellProps()} key={cellKey}>
                          {
                            // Render the cell contents
                            cell.render('Cell')
                          }
                        </td>
                      )
                    })
                  }
                </tr>
              )
            })
          }
        </tbody>
      </table>
      {manualPagination ? (
        paginationComponent
      ) : (
        <div className="pagination-container mt-4">
          <div className="pagination">
            <PrimaryButton
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              {'<<'}
            </PrimaryButton>{' '}
            <PrimaryButton
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              {'<'}
            </PrimaryButton>{' '}
            <PrimaryButton onClick={() => nextPage()} disabled={!canNextPage}>
              {'>'}
            </PrimaryButton>{' '}
            <PrimaryButton
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              {'>>'}
            </PrimaryButton>{' '}
            <span>
              Page{' '}
              <strong>
                {pageIndex + 1} of {pageOptions.length}
              </strong>{' '}
            </span>
            {/*<span>
            | Go to page:{' '}
            <input
              type="number"
              defaultValue={pageIndex + 1}
              onChange={(e) => {
                const page = e.target.value ? Number(e.target.value) - 1 : 0
                gotoPage(page)
              }}
              style={{ width: '100px' }}
            />
          </span>{' '}*/}
            <SelectBox1
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value))
              }}
              className="mt-0"
              options={[
                { label: 'Show 5', value: 5 },
                { label: 'Show 10', value: 10 },
                { label: 'Show 20', value: 20 },
                { label: 'Show 30', value: 30 },
                { label: 'Show 40', value: 40 },
                { label: 'Show 50', value: 50 }
              ]}
            />
          </div>
        </div>
      )}
    </div>
  )
}

RTable.propTypes = {
  columns: PropTypes.any,
  data: PropTypes.any,
  sortColumns: PropTypes.array,
  setGlobalFilterValue: PropTypes.string,
  style: PropTypes.object,
  pageSizes: PropTypes.array,
  defaultPageSize: PropTypes.number,
  manualPagination: PropTypes.bool,
  paginationComponent: PropTypes.any,
  recordIncreaseNumber: PropTypes.number,
  manualSortBy: PropTypes.bool,
  columnHeaderClick: PropTypes.func,
  getTrProps: PropTypes.func,
  selectedSorts: PropTypes.object,
  row: PropTypes.any
}

export default RTable

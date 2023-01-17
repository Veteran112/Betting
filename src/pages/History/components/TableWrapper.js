import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import SquareIcon from '@mui/icons-material/Square'

const TableWrapper = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'DATE',
        accessor: 'date',
        disableSortBy: true
      },
      {
        Header: 'EVENT',
        accessor: 'event',
        disableSortBy: true
      },
      {
        Header: 'ODDS',
        accessor: 'odds',
        disableSortBy: true,
        Cell: ({ row }) => {
          return row.original.odds.map((item, index) => (
            <div key={index}>
              {item > 0 && <>+</>}
              {item}
              <SquareIcon className="ml-1" color="primary" />
            </div>
          ))
        }
      },
      {
        Header: 'STAKE',
        accessor: 'stake',
        disableSortBy: true,
        Cell: ({ row }) => {
          return row.original.stake.map((item, index) => (
            <div key={index}>
              <span className="mr-1">$</span>
              {item}
            </div>
          ))
        }
      },
      {
        Header: 'PAYOUT',
        accessor: 'payout',
        disableSortBy: true,
        Cell: ({ row }) => {
          return row.original.payout.map((item, index) => (
            <div key={index}>
              <span className="mr-1">$</span>
              {item}
            </div>
          ))
        }
      },
      {
        Header: 'PROFIT',
        accessor: 'profit',
        disableSortBy: true,
        Cell: ({ row }) => {
          return <span>$ {row.original.profit} (2.93%)</span>
        }
      }
    ],
    []
  )

  return (
    <>
      <RTable
        data={props.data.data}
        columns={columns}
        style={{ height: 'auto' }}
        paginationBool={false}
      />
    </>
  )
}

TableWrapper.propTypes = {
  data: PropTypes.any,
  row: PropTypes.array
}
export default TableWrapper

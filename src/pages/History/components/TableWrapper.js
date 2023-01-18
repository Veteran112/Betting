import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import SquareIcon from '@mui/icons-material/Square'

const TableWrapper = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'DATE',
        accessor: 'date_create',
        disableSortBy: true,
        Cell: ({ row }) => {
          const d = new Date(row.original.date_create)
          let hour = d.toLocaleString('en-US', {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
          })
          const dateCreated =
            ('0' + (d.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + d.getDate()).slice(-2) +
            '-' +
            ('' + d.getFullYear()).slice(-2) +
            ' ' +
            hour
          return <span>{dateCreated}</span>
        }
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
          return row.original.odds.split(',').map((item, index) => (
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
          return row.original.stake.split(',').map((item, index) => (
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
          const odds = row.original.odds.split(',')
          const stakes = row.original.stake.split(',')
          return odds.map((item, index) => (
            <div key={index}>
              <span className="mr-1">$</span>
              {item > 0 ? (
                <>{(stakes[index] * (1 + Math.abs(item) / 100)).toFixed(2)}</>
              ) : (
                <>{(stakes[index] * (1 + 100 / Math.abs(item))).toFixed(2)}</>
              )}
            </div>
          ))
        }
      },
      {
        Header: 'PROFIT',
        accessor: 'profit',
        disableSortBy: true,
        Cell: ({ row }) => {
          const odds = row.original.odds.split(',')
          const stakes = row.original.stake.split(',')
          let totalStake = 0
          for (let i = 0; i < stakes.length; i++) {
            totalStake += parseFloat(stakes[i])
          }
          let payout = 0
          if (odds[0] > 0) {
            payout = stakes[0] * (1 + Math.abs(odds[0]) / 100)
          } else {
            payout = stakes[0] * (1 + 100 / Math.abs(odds[0]))
          }
          return (
            <>
              <span className="mr-1">$</span>
              {(payout - totalStake).toFixed(2)}
              <span className="ml-2">
                ({(((payout - totalStake) / payout) * 100).toFixed(2)}%)
              </span>
            </>
          )
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
      />
    </>
  )
}

TableWrapper.propTypes = {
  data: PropTypes.any,
  row: PropTypes.array
}
export default TableWrapper

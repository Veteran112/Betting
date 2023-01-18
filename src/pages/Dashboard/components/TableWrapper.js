import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import SquareIcon from '@mui/icons-material/Square'
import { useNavigate } from 'react-router'

const TableWrapper = (props) => {
  const history = useNavigate()
  const columns = React.useMemo(
    () => [
      {
        Header: '%',
        accessor: 'percent',
        disableSortBy: true
      },
      {
        Header: 'DATE',
        disableSortBy: true,
        Cell: ({ row }) => {
          const d = new Date(row.original.date_created)
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
        Header: 'BOOKS',
        accessor: 'books',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            row.original.books &&
            row.original.books.split(',').map((item, index) => (
              <span key={index} className="ml-3">
                {item > 0 && <>+</>}
                {item}
                <SquareIcon className="ml-1" color="primary" />
              </span>
            ))
          )
        }
      },
      {
        Header: 'MARKET',
        accessor: 'market',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <>
              {row.original.market}
              <Button
                className="_btn ml-2"
                onClick={() => history(`/bet/${row.original._id}`)}
              >
                BET
              </Button>
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
        data={props.data}
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

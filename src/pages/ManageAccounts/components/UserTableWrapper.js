import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'

const UserTableWrapper = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'fname'
      },
      {
        Header: 'Last Name',
        accessor: 'lname'
      },
      {
        Header: 'Email',
        accessor: 'email',
        disableSortBy: true
      },
      {
        Header: 'Password',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <>
              <Button
                className="_btn w-100"
                onClick={() => props.onPasswordUpdate(row)}
              >
                CHANGE PASSWORD
              </Button>
            </>
          )
        }
      },
      {
        Header: 'Status',
        accessor: 'status',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <>
              {row.original.status}
              <Button className="_btn ml-2">BLOCK</Button>
            </>
          )
        }
      },
      {
        Header: ' ',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <>
              <Button className="_btn" onClick={() => props.onEdit(row)}>
                EDIT USER
              </Button>
              <Button className="_btn ml-2" onClick={() => props.onDelete(row)}>
                DELETE USER
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
        data={props.data.usersData}
        columns={columns}
        sortColumns={props.sortColumns}
        style={{ height: 'auto' }}
        manualSortBy={true}
        recordIncreaseNumber={props.recordIncreaseNumber}
        columnHeaderClick={(column) => {
          props.onSortChange(column)
        }}
        selectedSorts={props.selectedSorts}
      />
    </>
  )
}

UserTableWrapper.propTypes = {
  data: PropTypes.any,
  onEdit: PropTypes.func.isRequired,
  onPasswordUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPaginationChange: PropTypes.func,
  pageLimit: PropTypes.number,
  recordIncreaseNumber: PropTypes.number,
  onSearchAccountsChange: PropTypes.func,
  onSortChange: PropTypes.func,
  selectedSorts: PropTypes.object,
  row: PropTypes.array,
  sortColumns: PropTypes.array
}
export default UserTableWrapper

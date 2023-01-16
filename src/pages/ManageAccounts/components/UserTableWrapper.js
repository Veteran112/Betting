import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import Pagination from 'components/RTable/pagination'
import { Button } from '@mui/material'

const UserTableWrapper = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'First Name',
        accessor: 'firstName'
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        disableSortBy: true
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

  const sortColumns = React.useMemo(() => {
    return [
      {
        id: 'createdAt',
        desc: false
      }
    ]
  }, [])

  return (
    <>
      <RTable
        data={props.data.usersData}
        columns={columns}
        sortColumns={sortColumns}
        style={{ height: 'auto' }}
        manualPagination={true}
        manualSortBy={true}
        paginationComponent={
          <Pagination
            pageChangeHandler={(currentPage) => {
              props.onPaginationChange(currentPage)
            }}
            totalPages={props.data.totalPages}
            defaultPageSize={props.pageLimit ?? 10}
          />
        }
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
  row: PropTypes.array
}
export default UserTableWrapper

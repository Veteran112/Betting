import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import { useAuth } from 'contexts'

const UserTableWrapper = (props) => {
  const auth = useAuth()
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
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <>
              {auth.profile.user_type === 'admin' &&
                row.original.user_type !== 'admin' &&
                row.original.admin_id && (
                  <>
                    <span>{!row.original.block ? 'Active' : 'Inactive'}</span>
                    <Button
                      className="_btn ml-2"
                      onClick={() => props.onBlock(row, !row.original.block)}
                    >
                      {!row.original.block ? 'Block' : 'Unblock'}
                    </Button>
                  </>
                )}
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

              {auth.profile.user_type === 'admin' &&
                row.original.user_type !== 'admin' &&
                row.original.admin_id && (
                  <Button
                    className="_btn ml-2"
                    onClick={() => props.onDelete(row)}
                  >
                    DELETE USER
                  </Button>
                )}
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
  onBlock: PropTypes.func.isRequired,
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

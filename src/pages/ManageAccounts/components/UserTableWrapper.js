import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import Pagination from 'components/RTable/pagination'
import { useNavigate } from 'react-router-dom'

const UserTableWrapper = (props) => {
  const navigate = useNavigate()
  const availabilities = [
    { label: 'Available', class: 'available' },
    { label: 'Unavailable', class: 'unavailable' },
    { label: 'Scheduled', class: 'scheduled' }
  ]

  const columns = React.useMemo(
    () => [
      {
        Header: 'No',
        accessor: 'no',
        disableSortBy: true,
        Cell: (props) => {
          return <span>{props.row.serial}</span>
        }
      },
      {
        Header: 'First Name',
        accessor: 'firstName', // accessor is the "key" in the data
        disableSortBy: true
      },
      {
        Header: 'Last Name',
        accessor: 'lastName',
        disableSortBy: true
      },
      {
        Header: 'Email Address',
        accessor: 'email',
        disableSortBy: true
      },
      {
        Header: 'Phone Number',
        accessor: 'phone',
        disableSortBy: true
      },
      {
        Header: 'Language',
        accessor: 'language',
        disableSortBy: true,
        Cell: ({ row }) => {
          if (row.original.userType === 'interpreter') {
            return <span>{row.original.language}</span>
          } else {
            return <></>
          }
        }
      },
      {
        Header: 'User Type',
        accessor: 'userType',
        disableSortBy: true,
        Cell: (props) => {
          return (
            <span>
              {props.row.values.userType
                .split('_')
                .map((x) => x[0].toUpperCase() + x.substring(1))
                .join(' ')}
            </span>
          )
        }
      },
      {
        Header: 'Availability',
        accessor: 'availability',
        disableSortBy: true,
        Cell: ({ row }) => {
          if (row.original.userType === 'interpreter') {
            const availibilityObject =
              availabilities[Number(row.original.availability)]
            return (
              <span className={availibilityObject.class}>
                {availibilityObject.label}
              </span>
            )
          } else {
            return <></>
          }
        }
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <span className="action-items-wrapper">
            {row.original.userType === 'interpreter' && (
              <span
                className="pl-2 t-fontawesome"
                onClick={() => {
                  navigate(`/manage_users/${row.original._id}`)
                }}
              >
                <i className="fa fa-clock text-primary cursor-pointer" />
              </span>
            )}
            <span
              className="pl-2 t-fontawesome"
              onClick={() => {
                props.onEdit(row)
              }}
            >
              <i className="fa fa-edit text-primary cursor-pointer" />
            </span>
            <span
              className="pl-2 t-fontawesome"
              onClick={() => {
                props.onPasswordUpdate(row)
              }}
            >
              <i className="fas fa-key text-info cursor-pointer" />
            </span>
            <span
              className="pl-2 t-fontawesome"
              onClick={() => {
                props.onDelete(row)
              }}
            >
              <i className="fa fa-trash-alt text-danger cursor-pointer" />
            </span>
          </span>
        )
      },
      {
        Header: 'Created At',
        accessor: 'createdAt',
        show: false
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

  // const [globalFilterValue, setGlobalFilterValue] = useState()
  return (
    <>
      <RTable
        data={props.data.usersData}
        columns={columns}
        sortColumns={sortColumns}
        //setGlobalFilterValue={globalFilterValue}
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

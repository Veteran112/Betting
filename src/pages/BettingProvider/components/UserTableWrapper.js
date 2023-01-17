import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useNavigate } from 'react-router-dom'

const UserTableWrapper = (props) => {
  const history = useNavigate()
  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name'
      },
      {
        Header: 'URL',
        accessor: 'url',
        disableSortBy: true
      },
      {
        Header: ' ',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <>
              <Button className="_btn" onClick={() => props.onEdit(row)}>
                EDIT
              </Button>
              <Button className="_btn ml-2" onClick={() => props.onDelete(row)}>
                DELETE
              </Button>

              <ArrowForwardIcon
                className="float-right mt-3 cursor-pointer"
                onClick={() =>
                  history(
                    '/betting_provider/' +
                      row.original._id +
                      '/' +
                      row.original.name
                  )
                }
              />
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

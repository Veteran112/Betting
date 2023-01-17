import React, { useState } from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { Button } from '@mui/material'
import TestModal from './TestModal'

const UserTableWrapper = (props) => {
  const [testModal, openTestModal] = useState(false)
  const columns = React.useMemo(
    () => [
      {
        Header: 'STEP',
        accessor: 'step',
        disableSortBy: true
      },
      {
        Header: 'Command',
        accessor: 'command',
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
        id: 'step',
        desc: false
      }
    ]
  }, [])

  // const [globalFilterValue, setGlobalFilterValue] = useState()
  return (
    <>
      <RTable
        data={props.data.data}
        columns={columns}
        sortColumns={sortColumns}
        style={{ height: 'auto' }}
        manualSortBy={true}
        recordIncreaseNumber={props.recordIncreaseNumber}
        columnHeaderClick={(column) => {
          props.onSortChange(column)
        }}
        selectedSorts={props.selectedSorts}
      />
      <Button
        className="_btn float-right"
        onClick={() => openTestModal(!testModal)}
      >
        RUN TEST
      </Button>
      <TestModal open={testModal} onClose={() => openTestModal(false)} />
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
  row: PropTypes.array
}
export default UserTableWrapper

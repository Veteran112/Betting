import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { TextField1 } from 'components/TextField1'
import Pagination from 'components/RTable/pagination'
import moment from 'moment'

const WorkTimeTable = (props) => {
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
        Header: 'Date',
        accessor: 'date', // accessor is the "key" in the data
        // disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <span>
              {moment(new Date(row.original.date)).format('YYYY-MM-DD hh:mm a')}
            </span>
          )
        }
      },
      {
        Header: 'Work Time',
        accessor: 'workTime',
        // disableSortBy: true,
        Cell: ({ row }) => {
          const workTime = row.original.workTime
          const sec = workTime % 60
          const min = (workTime - sec) / 60
          return <span>{`${min}m ${sec}s`}</span>
        }
      },
      {
        Header: 'Actions',
        accessor: 'actions',
        disableSortBy: true,
        Cell: ({ row }) => (
          <span className="action-items-wrapper">
            <span
              className="pl-2 t-fontawesome"
              onClick={() => {
                props.onEdit(row.original)
              }}
            >
              <i className="fa fa-edit text-primary cursor-pointer" />
            </span>
            <span
              className="pl-2 t-fontawesome"
              onClick={() => {
                props.onDelete(row.original)
              }}
            >
              <i className="fa fa-trash-alt text-danger cursor-pointer" />
            </span>
          </span>
        )
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
      <div className="row mb-4">
        <div className="col-md-4 col-xs-12 col-sm-6 d-flex justify-content-between">
          <TextField1
            id="startDate"
            kind="TextField"
            label="Start Date"
            type="date"
            className="mr-2"
            value={props.dateData.startDate}
            onChange={props.onStartDateChange}
          />
          <TextField1
            id="endDate"
            kind="TextField"
            label="End Date"
            type="date"
            value={props.dateData.endDate}
            onChange={props.onEndDateChange}
          />
        </div>
      </div>
      <RTable
        data={props.data.data}
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

WorkTimeTable.propTypes = {
  data: PropTypes.any,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onPaginationChange: PropTypes.func,
  pageLimit: PropTypes.number,
  dateData: PropTypes.any,
  recordIncreaseNumber: PropTypes.number,
  onSearchAccountsChange: PropTypes.func,
  onSortChange: PropTypes.func,
  selectedSorts: PropTypes.object,
  row: PropTypes.array
}
export default WorkTimeTable

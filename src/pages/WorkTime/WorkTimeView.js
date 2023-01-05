import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Chip, CircularProgress, Typography } from '@mui/material'
import { PrimaryButton } from 'components/StyledButton'
import { getAPIService } from 'services/apiServices'
import APIConstants from 'services/CONSTANTS'
import Swal from 'sweetalert2'
import WorkTimeModal from './components/WorkTimeModal'
import WorkTimeDeleteModal from './components/WorkTimeDeleteModal'
import { workTimeFields } from './constants'
import moment from 'moment'
import WorkTimeTable from './components/WorkTimeTable'

const WorkTimeView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [loading, setLoading] = useState('')
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [totalTime, setTotalTime] = useState(0)
  const [sortFields, setSortFields] = useState({})
  const [availableData, setAvailableData] = useState({
    total: 0,
    totalPages: 0,
    uid: '',
    name: '',
    data: []
  })
  const initialWorkTimeData = {
    id: undefined,
    date: moment().format('YYYY-MM-DD'),
    time: moment().format('hh:mm'),
    min: 0,
    sec: 0
  }
  const [workTimeData, setWorkTimeData] = useState(initialWorkTimeData)
  const [modalsState, setModalsState] = useState({
    addWorkTime: false,
    editWorkTime: false,
    deleteWorkTime: false
  })

  const params = useParams()
  const [paginationOptions, setPaginationOptions] = useState({
    limit: 10,
    page: 1
  })

  const getWorkTime = async (uid) => {
    setIsLoading(true)
    try {
      const data = await getAPIService(APIConstants.GET_WORKTIME, {
        ...paginationOptions,
        uid,
        startDate,
        endDate,
        sortFields: sortFields
      })
      let sum = 0
      data.data.map((item) => {
        sum += Number(item.workTime)
      })
      setTotalTime(sum)
      setAvailableData(data)
    } catch (err) {
      console.log(err)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err
      })
    }
    setIsLoading(false)
  }

  const onEditClick = (rowData) => {
    const workTime = rowData.workTime
    const sec = workTime % 60
    const min = (workTime - sec) / 60
    setWorkTimeData({
      id: rowData._id,
      date: moment(new Date(rowData.date)).format('YYYY-MM-DD'),
      time: moment(new Date(rowData.date)).format('hh:mm'),
      min: min,
      sec: sec
    })
    setModalsState({ ...modalsState, editWorkTime: true })
  }

  useEffect(() => {
    setPaginationOptions({
      limit: 10,
      page: 1
    })
    getWorkTime(params.id)
  }, [])

  useEffect(() => {
    getWorkTime(params.id)
  }, [paginationOptions, endDate, startDate, sortFields])

  return (
    <div className="work-time-container">
      <div className="work-time-details-box container mx-auto">
        <div className="d-flex mt-2 mb-4 justify-content-between">
          <div>
            <Typography variant="h5" component="h5" className="onyx main-font">
              {availableData.name} - Work Time
              <Chip label={`${availableData.total}`} color="primary" />
            </Typography>
            <Typography variant="h6" component="h6" className="onyx main-font">
              Total Work Time - {(totalTime - (totalTime % 60)) / 60}m{' '}
              {totalTime % 60}s
            </Typography>
            {isLoading && (
              <CircularProgress
                size={20}
                color="inherit"
                sx={{ alignSelf: 'center', marginLeft: '10px' }}
              />
            )}
          </div>
          <div>
            <PrimaryButton
              onClick={() =>
                setModalsState({
                  ...modalsState,
                  addWorkTime: true
                })
              }
            >
              Add WorkTime
            </PrimaryButton>
          </div>
        </div>
        <div>
          <WorkTimeTable
            data={availableData}
            pageLimit={paginationOptions.limit}
            recordIncreaseNumber={
              paginationOptions.page === 1
                ? 1
                : (parseInt(paginationOptions.page) - 1) *
                  parseInt(paginationOptions.limit)
            }
            onStartDateChange={(e) => setStartDate(e.target.value)}
            onEndDateChange={(e) => setEndDate(e.target.value)}
            dateData={{ startDate, endDate }}
            onEdit={onEditClick}
            selectedSorts={sortFields}
            onSortChange={(column) => {
              setSortFields((prevState) => {
                return {
                  [column.id]: parseInt(prevState[column.id] ?? 1) * -1
                }
              })
            }}
            onDelete={(rowData) => {
              setWorkTimeData({
                ...workTimeData,
                id: rowData._id
              })
              setModalsState({ ...modalsState, deleteWorkTime: true })
            }}
            onPaginationChange={(currentPage) => {
              setPaginationOptions({
                limit: currentPage.pageSize,
                page: currentPage.currentPage
              })
            }}
          />
        </div>
        <div>
          <WorkTimeModal
            open={modalsState.addWorkTime}
            title={'Add Work Time'}
            sourceFields={workTimeFields}
            data={workTimeData}
            setData={setWorkTimeData}
            primaryActionName={'Create'}
            secondaryActionName={'Close'}
            onPrimaryClick={() => {
              setLoading('addWorkTime')
              getAPIService(APIConstants.ADD_WORKTIME, {
                uid: availableData.uid,
                // date: workTimeData.date,
                date: moment(`${workTimeData.date} ${workTimeData.time}`),
                // time: workTimeData.time,
                workTime:
                  Number(workTimeData.min * 60) + Number(workTimeData.sec)
              })
                .then(() => {
                  Swal.fire({
                    icon: 'success',
                    text: 'Work Time Created',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setWorkTimeData(initialWorkTimeData)
                  setLoading('')
                  getWorkTime(params.id)
                })
                .catch((err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err
                  })
                  setLoading('')
                })
                .finally(() => {
                  setModalsState({
                    ...modalsState,
                    addWorkTime: false
                  })
                })
            }}
            isLoading={loading === 'addWorkTime'}
            onSecondaryClick={() => {
              setModalsState({
                ...modalsState,
                addWorkTime: false
              })
            }}
          />
          <WorkTimeModal
            open={modalsState.editWorkTime}
            title={'Edit Work Time'}
            sourceFields={workTimeFields}
            data={workTimeData}
            setData={setWorkTimeData}
            primaryActionName={'Update'}
            secondaryActionName={'Close'}
            onPrimaryClick={() => {
              console.log(startDate, endDate, 'update work time')
              setLoading('editWorkTime')
              getAPIService(APIConstants.UPDATE_WORKTIME, {
                id: workTimeData.id,
                data: {
                  date: moment(`${workTimeData.date} ${workTimeData.time}`),
                  workTime:
                    Number(workTimeData.min * 60) + Number(workTimeData.sec)
                }
              })
                .then(() => {
                  Swal.fire({
                    icon: 'success',
                    text: 'Work Time Updated',
                    showConfirmButton: false,
                    timer: 1500
                  })
                  setWorkTimeData(initialWorkTimeData)
                  setLoading('')
                  getWorkTime(params.id)
                })
                .catch((err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err
                  })
                  setLoading('')
                })
                .finally(() => {
                  setModalsState({
                    ...modalsState,
                    editWorkTime: false
                  })
                })
            }}
            isLoading={loading === 'editWorkTime'}
            onSecondaryClick={() => {
              setModalsState({
                ...modalsState,
                editWorkTime: false
              })
            }}
          />
          <WorkTimeDeleteModal
            open={modalsState.deleteWorkTime}
            primaryActionName={'Delete'}
            secondaryActionName={'Close'}
            onPrimaryClick={() => {
              setLoading('deleteWorkTime')
              getAPIService(APIConstants.DELETE_WORKTIME, {
                id: workTimeData.id
              })
                .then(() => {
                  Swal.fire(
                    'Work Time Deleted!',
                    'Work Time has been deleted.',
                    'success'
                  )
                })
                .catch((err) => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: err
                  })
                })
                .finally(() => {
                  setLoading('')
                  getWorkTime(params.id)
                  setModalsState({ ...modalsState, deleteWorkTime: false })
                  setWorkTimeData(initialWorkTimeData)
                })
            }}
            isLoading={loading === 'deleteWorkTime'}
            onSecondaryClick={() => {
              setModalsState({
                ...modalsState,
                deleteWorkTime: false
              })
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default WorkTimeView

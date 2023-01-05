import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Modal, Typography, CircularProgress, Box } from '@mui/material'
import moment from 'moment'
import { getAPIService } from 'services/apiServices'
import APIConstants from 'services/CONSTANTS'
import { useAuth } from 'contexts'
import Swal from 'sweetalert2'
import WorkTimeTable from './WorkTimeTable'

const WorkTimeModal = (props) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 900,
    bgcolor: 'background.paper',
    border: '2px solid #2e2e2e',
    boxShadow: 24,
    p: 2
  }

  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState(moment().format('YYYY-MM-DD'))
  const [endDate, setEndDate] = useState(moment().format('YYYY-MM-DD'))
  const [sortFields, setSortFields] = useState({})
  const [totalTime, setTotalTime] = useState(0)
  const auth = useAuth()
  const [availableData, setAvailableData] = useState({
    total: 0,
    totalPages: 1,
    uid: '',
    name: '',
    data: []
  })
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
        sortFields
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

  useEffect(() => {
    setPaginationOptions({
      limit: 10,
      page: 1
    })
    getWorkTime(auth.profile.uid)
  }, [])

  useEffect(() => {
    getWorkTime(auth.profile.uid)
  }, [paginationOptions, endDate, startDate, sortFields])

  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box sx={style}>
        <div className="d-flex mt-2 mb-4 justify-content-between">
          <div>
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
            <i className="fa fa-times cursor-pointer" onClick={props.onClose} />
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
            onSortChange={(column) => {
              setSortFields((prevState) => {
                return {
                  [column.id]: parseInt(prevState[column.id] ?? 1) * -1
                }
              })
            }}
            selectedSorts={sortFields}
            dateData={{ startDate, endDate }}
            onPaginationChange={(currentPage) => {
              setPaginationOptions({
                limit: currentPage.pageSize,
                page: currentPage.currentPage
              })
            }}
          />
        </div>
      </Box>
    </Modal>
  )
}

WorkTimeModal.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any
}

export default WorkTimeModal

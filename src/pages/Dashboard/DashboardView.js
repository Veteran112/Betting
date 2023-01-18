import React, { useEffect, useState } from 'react'
import { CircularProgress, Typography } from '@mui/material'
import { PrimaryButton } from 'components/StyledButton'
import { getAPIService } from 'services/apiServices'
import APIConstants from 'services/CONSTANTS'
import Swal from 'sweetalert2'
import TableWrapper from './components/TableWrapper'

const DashboardView = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [availableBets, setAvailableBets] = useState([])

  const getBets = async () => {
    setIsLoading(true)
    try {
      const data = await getAPIService(APIConstants.BETS, {}, 'GET')

      if (data.error) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: data.error
        })
      } else {
        setAvailableBets(data)
      }
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
    getBets()
  }, [])

  return (
    <div className="manage-accounts-container">
      <div className="manage-accounts-details-box container mx-auto">
        <div className="d-flex mt-2 mb-4 justify-content-between">
          <div>
            <Typography variant="h5" component="h5" className="onyx main-font">
              DASHBOARD
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
            <span className="mr-3">LAST UPDATE: 09-02-22 01:00AM</span>
            <PrimaryButton>Update</PrimaryButton>
          </div>
        </div>
        <div className="fixTableHead">
          <TableWrapper data={availableBets} />
        </div>
      </div>
    </div>
  )
}

export default DashboardView

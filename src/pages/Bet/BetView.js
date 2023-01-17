import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { PrimaryButton } from 'components/StyledButton'
// import { getAPIService } from 'services/apiServices'
// import APIConstants from 'services/CONSTANTS'
import Swal from 'sweetalert2'
import TableWrapper from './components/TableWrapper'

import { betDetailData } from 'data'

const BetView = () => {
  const [isLoading, setIsLoading] = useState(false)

  const [availableBets, setAvailableBets] = useState({
    total: 0,
    totalPages: 1,
    data: []
  })

  const getBets = async () => {
    setIsLoading(true)
    try {
      // const data = await getAPIService(APIConstants.GET_USERS, {
      //   ...paginationOptions,
      //   // searchAccount: searchAccount,
      //   filter: filterData,
      //   sortFields: sortFields
      // })
      setAvailableBets(betDetailData)
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
          <div className="d-flex">
            <div>
              <span>BASEBALL xxx vs. xxx</span>
              <br />
              <span>09-02-22 08:45AM</span>
            </div>
            <div className="ml-4 mt-2">
              <h3>+1.50%</h3>
            </div>
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
        <div>
          <TableWrapper data={availableBets} />
        </div>
      </div>
    </div>
  )
}

export default BetView

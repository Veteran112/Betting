import React, { useEffect, useState } from 'react'
import { CircularProgress } from '@mui/material'
import { PrimaryButton } from 'components/StyledButton'
import { getAPIService } from 'services/apiServices'
import APIConstants from 'services/CONSTANTS'
import Swal from 'sweetalert2'
import TableWrapper from './components/TableWrapper'

import { betDetailData } from 'data'
import { useParams } from 'react-router-dom'

const BetView = () => {
  const [isLoading, setIsLoading] = useState(false)
  const params = useParams()

  const [availableBets, setAvailableBets] = useState([])
  const [acceptedBet, setAcceptedBet] = useState([])
  const [totalStake, setTotalStake] = useState(0)
  const [totalPayout, setTotalPayout] = useState(0)
  const [profit, setProfit] = useState(0)
  const [betData, setBetData] = useState(null)

  const getBets = async () => {
    setIsLoading(true)
    try {
      const bet = await getAPIService(
        APIConstants.BETS + '/' + params.id,
        {},
        'GET'
      )
      if (bet.bet) {
        const d = new Date(bet.bet.date_created)
        let hour = d.toLocaleString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true
        })
        const dateCreated =
          ('0' + (d.getMonth() + 1)).slice(-2) +
          '-' +
          ('0' + d.getDate()).slice(-2) +
          '-' +
          ('' + d.getFullYear()).slice(-2) +
          ' ' +
          hour
        setBetData({
          percent: bet.bet.percent,
          date: dateCreated,
          event: bet.bet.event
        })

        for (let k = 0; k < betDetailData.length; k++) {
          let totalAmount = 0
          for (let i = 0; i < betDetailData[k].amount.split(',').length; i++) {
            totalAmount += parseFloat(betDetailData[k].amount.split(',')[i])
          }
          betDetailData[k].totalAmount = totalAmount
          betDetailData[k].date = dateCreated
          betDetailData[k].event = bet.bet.event
        }
        setAvailableBets(betDetailData)
        setAcceptedBet(betDetailData)
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

  useEffect(() => {
    if (totalPayout && totalStake) {
      setProfit((parseFloat(totalPayout) - parseFloat(totalStake)).toFixed(2))
    } else {
      setProfit(null)
    }
  }, [totalPayout, totalStake])

  const stakeHandle = (value, index) => {
    let arr = availableBets
    const newArray = arr.map((item, i) => {
      if (index === i) {
        let payout = null
        const odds = item.odds
        if (value !== '') {
          if (odds > 0) {
            payout = value * (1 + Math.abs(odds) / 100)
          } else {
            payout = value * (1 + 100 / Math.abs(odds))
          }
        }
        setTotalPayout(payout ? payout.toFixed(2) : null)
        return {
          ...item,
          stake: value,
          payout: payout ? payout.toFixed(2) : null
        }
      } else {
        return item
      }
    })

    let totalStakeAmount = 0
    for (let i = 0; i < newArray.length; i++) {
      if (newArray[i].stake) {
        totalStakeAmount += parseFloat(newArray[i].stake)
      }
    }

    setTotalStake(totalStakeAmount.toFixed(2))
    setAvailableBets(newArray)
    setAcceptedBet(newArray)
  }

  return (
    <div className="manage-accounts-container">
      <div className="manage-accounts-details-box container mx-auto">
        <div className="d-flex mt-2 mb-4 justify-content-between">
          <div className="d-flex">
            <div>
              <span>{betData?.event}</span>
              <br />
              <span>{betData?.date}</span>
            </div>
            <div className="ml-4 mt-2">
              <h3>
                {betData?.percent > 0 && <>+</>}
                {betData?.percent}%
              </h3>
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
            <span className="mr-3">LAST UPDATE: {betData?.date}</span>
            <PrimaryButton>Update</PrimaryButton>
          </div>
        </div>
        <div>
          <TableWrapper
            data={availableBets}
            acceptedBet={acceptedBet}
            stakeHandle={stakeHandle}
            totalStake={totalStake}
            totalPayout={totalPayout}
            profit={profit}
          />
        </div>
      </div>
    </div>
  )
}

export default BetView

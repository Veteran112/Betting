import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { Button, TextField, Box, Grid, Typography } from '@mui/material'
import SquareIcon from '@mui/icons-material/Square'

const TableWrapper = (props) => {
  const columns = React.useMemo(
    () => [
      {
        Header: ' ',
        disableSortBy: true,
        Cell: () => {
          return <span>Max</span>
        }
      },
      {
        Header: 'BOOKS',
        disableSortBy: true,
        Cell: ({ row }) => {
          const amount = row.original.amount.split(',')

          return (
            <>
              {amount.map((item, index) => (
                <span className="mr-2" key={index}>
                  {row.original.book > 0 && <>+</>}
                  {row.original.book}
                  <SquareIcon color="primary" />
                </span>
              ))}
              <br />
              {amount.map((item, index) => (
                <span className="mr-3" key={index}>
                  <span key={index}>$</span>
                  {item}
                </span>
              ))}
            </>
          )
        }
      },
      {
        Header: 'ODDS',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <span>
              {row.original.odds > 0 && <>+</>} {row.original.odds}
            </span>
          )
        }
      },
      {
        Header: 'STAKE',
        disableSortBy: true,
        Cell: ({ row }) => {
          const amount = row.original.amount.split(',')
          let totalAmount = 0
          for (let i = 0; i < amount.length; i++) {
            totalAmount += parseFloat(amount[i])
          }
          return (
            <>
              <TextField
                placeholder={'MAX $' + totalAmount}
                label={'MAX $' + totalAmount}
                variant="outlined"
                onChange={() => props.stakeHandle()}
                type="number"
              />
            </>
          )
        }
      },
      {
        Header: 'PAYOUT',
        disableSortBy: true,
        accessor: 'payout'
      }
    ],
    []
  )

  return (
    <>
      <div className="d-none">
        <RTable
          data={props.data}
          columns={columns}
          style={{ height: 'auto' }}
          paginationBool={false}
        />
      </div>
      <Typography>BOOKS</Typography>
      <table className="r-table r-table-full table-hover">
        <thead className="bg-light font-weight-500 font-size-15">
          <tr>
            <th></th>
            <th>BOOKS</th>
            <th>ODDS</th>
            <th>STAKE</th>
            <th>PAYOUT</th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((item, index) => (
            <tr key={index}>
              <td>Max</td>
              <td>
                {item.amount &&
                  item.amount.split(',').map((amountItem, index) => (
                    <span className="mr-2" key={index}>
                      {item.book > 0 && <>+</>}
                      {item.book}
                      <SquareIcon color="primary" />
                    </span>
                  ))}
                <br />
                {item.amount &&
                  item.amount.split(',').map((amountItem, index) => (
                    <span className="mr-3" key={index}>
                      <span key={index}>$</span>
                      {amountItem}
                    </span>
                  ))}
              </td>
              <td>
                {item.odds > 0 && <>+</>} {item.odds}
              </td>
              <td>
                <TextField
                  placeholder={'MAX $' + item.totalAmount}
                  label={'MAX $' + item.totalAmount}
                  variant="outlined"
                  onChange={(e) => props.stakeHandle(e.target.value, index)}
                  type="number"
                />
              </td>
              <td>
                {item.payout && (
                  <>
                    $ <span>{item.payout}</span>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box className="overflow-auto w-100">
        <Box className="p-2" style={{ width: '300px', float: 'right' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Total Stake</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>${props.totalStake}</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Total Payout</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {props.totalPayout && (
                  <>
                    $ <span>{props.totalPayout}</span>
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Profit(2.93%)</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>
                {props.profit && (
                  <>
                    $ <span>{props.profit}</span>
                  </>
                )}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className="w-100 overflow-auto mb-4">
        <Button className="_btn float-right mt-3">CONTINUE {'>'}</Button>
      </Box>
      <Typography className="text-center m-2">ACCEPTED BETS</Typography>
      <table className="r-table r-table-full table-hover">
        <thead className="bg-light font-weight-500 font-size-15">
          <tr>
            <th>DATE</th>
            <th>EVENT</th>
            <th>ODDS</th>
            <th>STAKE</th>
            <th>PAYOUT</th>
            <th>PROFIT</th>
          </tr>
        </thead>
        <tbody>
          {props.acceptedBet.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.event}</td>
              <td>
                {item.odds > 0 && <>+</>} {item.odds}
              </td>
              <td>
                {item.stake && (
                  <>
                    $ <span>{item.stake}</span>
                  </>
                )}
              </td>
              <td>
                {item.payout && (
                  <>
                    $ <span>{item.payout}</span>
                  </>
                )}
              </td>
              <td>
                {props.profit && (
                  <>
                    $ <span>{props.profit}</span>
                  </>
                )}{' '}
                (2.93%)
                <Button className="_btn ml-2">SCREEN</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

TableWrapper.propTypes = {
  data: PropTypes.any,
  row: PropTypes.array,
  acceptedBet: PropTypes.any,
  stakeHandle: PropTypes.func,
  totalStake: PropTypes.any,
  totalPayout: PropTypes.any,
  profit: PropTypes.any
}
export default TableWrapper

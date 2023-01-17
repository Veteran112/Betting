import React from 'react'
import RTable from 'components/RTable'
import PropTypes from 'prop-types'
import { Button, Input, Box, Grid, Typography } from '@mui/material'
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
        accessor: 'books',
        disableSortBy: true,
        Cell: ({ row }) => {
          return (
            <>
              {row.original.books.map((item, index) => (
                <span key={index} className="ml-3">
                  {item > 0 && <>+</>}
                  {item}
                  <SquareIcon className="ml-1" color="primary" />
                </span>
              ))}
              <br />
              {row.original.books.map((item, index) => (
                <span key={index} className="ml-3">
                  $1200
                </span>
              ))}
            </>
          )
        }
      },
      {
        Header: 'ODDS',
        disableSortBy: true,
        Cell: () => {
          return <>-250</>
        }
      },
      {
        Header: 'STAKE',
        disableSortBy: true,
        Cell: () => {
          return (
            <>
              <Input placeholder="MAX $2500" />
            </>
          )
        }
      },
      {
        Header: 'PAYOUT',
        disableSortBy: true,
        Cell: () => {
          return <>$1260</>
        }
      }
    ],
    []
  )

  const columns1 = React.useMemo(
    () => [
      {
        Header: 'DATE',
        disableSortBy: true,
        Cell: () => {
          return <span>09-02-22 08:45AM</span>
        }
      },
      {
        Header: 'EVENT',
        disableSortBy: true,
        Cell: () => {
          return <span>BASEBALL xxx vs. xxx</span>
        }
      },
      {
        Header: 'ODDS',
        disableSortBy: true,
        Cell: () => {
          return <>-250</>
        }
      },
      {
        Header: 'STAKE',
        disableSortBy: true,
        Cell: () => {
          return <span>$900</span>
        }
      },
      {
        Header: 'PAYOUT',
        disableSortBy: true,
        Cell: () => {
          return <>$1260</>
        }
      },
      {
        Header: 'PROFIT',
        disableSortBy: true,
        Cell: () => {
          return (
            <>
              $36.92(2.93%)<Button className="_btn ml-2">SCREEN</Button>
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
        style={{ height: 'auto' }}
        paginationBool={false}
      />
      <Box className="overflow-auto w-100">
        <Box className="p-2" style={{ width: '300px', float: 'right' }}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Total Stake</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>$1233.92</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Total Payout</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>$1900.32</Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography>Profit(2.93%)</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography>$32.93</Typography>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Box className="w-100 overflow-auto mb-4">
        <Button className="_btn float-right mt-3">CONTINUE {'>'}</Button>
      </Box>
      <RTable
        data={props.data.data}
        columns={columns1}
        style={{ height: 'auto' }}
        paginationBool={false}
      />
    </>
  )
}

TableWrapper.propTypes = {
  data: PropTypes.any,
  row: PropTypes.array
}
export default TableWrapper

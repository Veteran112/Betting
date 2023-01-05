import Button from '@mui/material/Button'
import { styled } from '@mui/system'
import { CircularProgress } from '@mui/material'
import ToggleButton from '@mui/material/ToggleButton'
import Pagination from '@mui/material/Pagination'
import PropTyes from 'prop-types'
import { onyx, shadeBlue, red } from 'config/Color'

export const SecondaryButton = styled(Button)({
  boxShadow: 'none',
  textTransform: 'none',
  fontSize: 16,
  padding: '6px 12px',
  border: '1px solid',
  lineHeight: 1.5,
  backgroundColor: 'white',
  borderColor: shadeBlue,
  color: shadeBlue,
  fontFamily: 'WorkSans',
  '&:hover': {
    backgroundColor: shadeBlue,
    boxShadow: 'none',
    color: 'white'
  },
  '&:active': {
    boxShadow: 'none',
    backgroundColor: shadeBlue,
    borderColor: shadeBlue
  },
  '&:focus': {
    boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
  },
  '&.Mui-disabled': {
    backgroundColor: 'white'
  }
})

export const PrimaryButton = styled(Button)(({ kind }) => {
  let col
  let kind1 = kind ? kind : 'success'
  switch (kind1) {
    case 'success':
      col = shadeBlue
      break
    case 'warning':
      col = red
      break
  }

  return {
    boxShadow: 'none',
    textTransform: 'none',
    fontSize: 16,
    padding: '6px 12px',
    border: '1px solid',
    lineHeight: 1.5,
    backgroundColor: col,
    borderColor: col,
    color: 'white',
    fontFamily: 'WorkSans',
    '&:hover': {
      backgroundColor: 'white',
      boxShadow: 'none',
      color: col
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: 'white',
      borderColor: col
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)'
    },
    '&.Mui-disabled': {
      backgroundColor: 'white'
    }
  }
})

export const MenuButton = styled(Button)({
  fontSize: '17px',
  marginLeft: '30px',
  fontWeight: '700',
  fontFamily: 'WorkSans',
  textTransform: 'none',
  color: onyx + ' !important'
})

export const PrimaryToggleButton = styled(ToggleButton)({
  fontFamily: 'WorkSans',
  fontSize: '12px',
  fontVariationSettings: '"wght" 400',
  color: 'black',
  '&.Mui-selected': {
    backgroundColor: shadeBlue,
    color: 'white'
  },
  '&.Mui-selected:hover': {
    backgroundColor: shadeBlue,
    color: 'white'
  }
})

export const PrimaryPagination = styled(Pagination)({
  '& ul .MuiPaginationItem-root.Mui-selected': {
    color: 'white',
    backgroundColor: shadeBlue
  }
})

export const PrimaryLoadingButton = (props) => {
  const { loading, label, ...others } = props
  return (
    <PrimaryButton variant="contained" disabled={loading} {...others}>
      {label}
      {loading && (
        <CircularProgress
          color="inherit"
          size={16}
          sx={{ marginLeft: '5px' }}
        />
      )}
    </PrimaryButton>
  )
}

PrimaryLoadingButton.propTypes = {
  loading: PropTyes.bool.isRequired,
  label: PropTyes.any.isRequired
}

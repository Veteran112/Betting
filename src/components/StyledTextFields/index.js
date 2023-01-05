import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { styled } from '@mui/material/styles'
import FilledInput from '@mui/material/FilledInput'
import InputLabel from '@mui/material/InputLabel'
import TextField from '@mui/material/TextField'
import FormControl from '@mui/material/FormControl'
import { MenuItem, Select, Checkbox, ListItemText } from '@mui/material'
import { FormHelperText } from '@mui/material'
import { getNumber3decimal } from 'utils/convertors'
import { tintGray, onyx, shadeBlue, red } from 'config/Color'

import './index.scss'

const PrimaryInput = styled(FilledInput)(({ theme }) => ({
  borderRadius: 4,
  position: 'relative',
  backgroundColor: 'white',
  border: `1px solid ${tintGray} !important`,
  fontFamily: 'WorkSans',
  fontSize: '14px !important',
  fontVariationSettings: '"wght" 400',
  paddingTop: '5px',
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow'
  ]),
  '&.MuiFilledInput-root:after': {
    borderBottom: `2px solid ${shadeBlue}`
  },
  '&.MuiFilledInput-root.Mui-error:after': {
    borderBottom: `2px solid ${red} !important`
  },
  '&.Mui-disabled': {
    backgroundColor: 'rgb(197 197 197) !important'
  },
  '&:before': {
    borderBottom: 'none !important'
  },
  '&:hover': {
    backgroundColor: 'transparent'
  },
  '&:focus': {
    backgroundColor: 'transparent'
  },
  '&:active': {
    backgroundColor: 'transparent'
  },
  '& .MuiInputAdornment-positionStart': {
    marginTop: '18px !important',
    marginRight: '5px'
  },
  '& .MuiTypography-root': {
    fontSize: '14px !important'
  }
}))

const PrimarySelectTextField = styled(TextField)(({ theme }) => ({
  position: 'relative',
  backgroundColor: 'white',
  fontFamily: 'WorkSans',
  fontSize: '14px !important',
  fontVariationSettings: '"wght" 400',
  border: 'none',
  transition: theme.transitions.create([
    'border-color',
    'background-color',
    'box-shadow'
  ]),

  '& .MuiFilledInput-root:after': {
    borderBottom: `2px solid ${shadeBlue}`
  },
  '&.MuiFilledInput-root.Mui-error:after': {
    borderBottom: `2px solid ${red} !important`
  },
  '& .MuiFilledInput-underline:before': {
    borderBottom: 'none !important'
  },

  '& .MuiFilledInput-root': {
    backgroundColor: 'white',
    fontFamily: 'WorkSans',
    fontSize: '15px !important',
    fontVariationSettings: '"wght" 400'
  },

  '& .MuiFilledInput-root .Mui-disabled': {
    backgroundColor: 'rgb(197 197 197) !important'
  },

  '& .MuiFilledInput-root:hover': {
    backgroundColor: 'white'
  },

  '& .MuiFilledInput-root:focus': {
    backgroundColor: 'white'
  },

  '& .MuiFilledInput-root:active': {
    backgroundColor: 'white'
  },

  '& .MuiInputLabel-root': {
    marginTop: '-4px',
    fontSize: '15px !important',
    fontFamily: "'WorkSans' !important",
    fontVariationSettings: "'wght' 500",
    borderBottom: `1px solid ${tintGray}`,
    color: `${onyx} !important`
  },

  '& .MuiSelect-select': {
    height: 'auto',
    minHeight: '1.4375em',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    fontSize: '14px !important',
    fontFamily: "'WorkSans' !important",
    fontVariationSettings: "'wght' 400",
    paddingTop: '25px',
    border: `1px solid ${tintGray} !important`,
    borderRadius: 4
  },
  '& .MuiInputLabel-shrink': {
    transform: 'translate(12px, 10px) scale(0.75)'
  },
  '& .MuiFormHelperText-root': {
    lineHeight: '1.66',
    letterSpacing: '0.03333em',
    textAlign: 'left',
    marginTop: '3px',
    marginRight: '14px',
    marginBottom: '0',
    marginLeft: '0',
    fontFamily: 'WorkSans',
    fontSize: '12px',
    fontVariationSettings: "'wght' 500"
  }
}))

const PrimaryMenuItem = styled(MenuItem)(() => ({
  fontFamily: 'WorkSans',
  fontSize: '15px !important',
  fontVariationSettings: '"wght" 400'
}))

export function PrimaryPhoneField(props) {
  const { ...other } = props
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor={'phonenumber'} className="primaryLabel" shrink>
        {'Phone Number'}
      </InputLabel>
      <PrimaryInput id={'phonenumber'} {...other} />
    </FormControl>
  )
}

export function PrimaryTextField(props) {
  const { id, label, helperText, error, ...other } = props
  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor={id} className="primaryLabel" shrink>
        {label}
      </InputLabel>
      <PrimaryInput
        id={id}
        {...other}
        inputProps={{ min: other.min }}
        error={error}
      />
      {error && (
        <FormHelperText size="small" className="helperText" error>
          {' '}
          {helperText}{' '}
        </FormHelperText>
      )}
    </FormControl>
  )
}

PrimaryTextField.propTypes = {
  id: PropTypes.any.isRequired,
  label: PropTypes.any.isRequired,
  helperText: PropTypes.string,
  error: PropTypes.bool
}

export function PrimarySelect(props) {
  const { id, label, data, ...other } = props
  return (
    <PrimarySelectTextField
      id={id}
      select
      label={label}
      className="w-100"
      size="small"
      variant="filled"
      {...other}
    >
      {data.map((option) => (
        <PrimaryMenuItem
          key={option.value}
          value={option.value}
          disabled={option.value == -1 ? true : false}
        >
          {option.label}
        </PrimaryMenuItem>
      ))}
    </PrimarySelectTextField>
  )
}

PrimarySelect.propTypes = {
  id: PropTypes.any,
  label: PropTypes.any,
  data: PropTypes.array
}

const SelectWithCheckBox = styled(Select)(() => ({
  backgroundColor: 'white',
  fontFamily: 'WorkSans',
  fontSize: '15px !important',
  fontVariationSettings: '"wght" 400',
  border: `1px solid ${tintGray}`,
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none'
  },
  '& .MuiSelect-select': {
    padding: '10px 10px'
  }
}))

export function PrimaryMultipleSelect(props) {
  const { data, values, disabledValues, handleChange, ...other } = props
  return (
    <SelectWithCheckBox
      sx={{ width: '200px' }}
      value={values}
      onChange={handleChange}
      multiple
      renderValue={(selected) => {
        const selectedLabels = []
        const selectedVals = data.filter(
          (item) => selected.indexOf(item.value) > -1
        )
        selectedVals.map((item) => {
          selectedLabels.push(item.label)
        })
        return selectedLabels.join(', ')
      }}
      inputProps={{ 'aria-label': 'Without label' }}
      {...other}
    >
      {data.map((item, index) => (
        <MenuItem
          key={index}
          value={item.value}
          disabled={disabledValues.indexOf(item.value) > -1}
        >
          <Checkbox checked={values.indexOf(item.value) > -1} />
          <ListItemText primary={item.label} />
        </MenuItem>
      ))}
    </SelectWithCheckBox>
  )
}

PrimaryMultipleSelect.propTypes = {
  data: PropTypes.array.isRequired,
  values: PropTypes.array.isRequired,
  disabledValues: PropTypes.array.isRequired,
  handleChange: PropTypes.func.isRequired
}

export function PrimaryNumberFormatTextField(props) {
  const { id, label, helperText, value, onChange, error, ...other } = props
  const [seperatedVal, setSeperatedVal] = useState(0)

  const removeNonNumeric = (num) => {
    let nNum
    if (num[0] === '-') {
      nNum = num.substring(1, num.length)
    } else {
      nNum = num
    }
    nNum = nNum.toString().replace(/[^0-9.]/g, '')
    if (num[0] === '-') {
      return '-' + nNum
    } else return nNum
  }

  const handleChange = (event) => {
    setSeperatedVal(getNumber3decimal(event.target.value))
    onChange({
      target: {
        value: removeNonNumeric(event.target.value)
      }
    })
  }

  useEffect(() => {
    setSeperatedVal(getNumber3decimal(value == null ? '' : value))
  }, [])

  return (
    <FormControl variant="filled" fullWidth>
      <InputLabel htmlFor={id} className="primaryLabel" shrink>
        {label}
      </InputLabel>
      <PrimaryInput
        id={id}
        error={error}
        value={seperatedVal}
        {...other}
        type="text"
        onInput={handleChange}
      />
      {error && (
        <FormHelperText size="small" className="helperText" error>
          {' '}
          {helperText}{' '}
        </FormHelperText>
      )}
    </FormControl>
  )
}

PrimaryNumberFormatTextField.propTypes = {
  id: PropTypes.any,
  label: PropTypes.any,
  helperText: PropTypes.string,
  value: PropTypes.any,
  error: PropTypes.any,
  onChange: PropTypes.func.isRequired
}
